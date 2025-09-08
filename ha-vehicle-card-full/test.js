#!/usr/bin/env node

/**
 * BMW/MINI Vehicle Card Test Suite
 * 
 * This script validates the implementation against the project requirements
 * and provides comprehensive testing for the vehicle card functionality.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test configuration
const TEST_CONFIG = {
  buildOutput: 'dist/ha-vehicle-card.js',
  sourceFiles: [
    'src/types.ts',
    'src/discovery.ts', 
    'src/ha-vehicle-card.ts',
    'src/ha-vehicle-card-editor.ts',
    'src/index.ts'
  ],
  requiredFiles: [
    'package.json',
    'tsconfig.json',
    'rollup.config.js',
    'hacs.json',
    'README.md',
    'LICENSE'
  ]
};

// Test results
let testResults = {
  passed: 0,
  failed: 0,
  warnings: 0,
  tests: []
};

// Utility functions
function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = {
    info: 'ℹ️',
    success: '✅',
    error: '❌',
    warning: '⚠️'
  }[type] || 'ℹ️';
  
  console.log(`${prefix} [${timestamp}] ${message}`);
}

function addTest(name, status, message = '') {
  testResults.tests.push({ name, status, message });
  if (status === 'passed') testResults.passed++;
  else if (status === 'failed') testResults.failed++;
  else if (status === 'warning') testResults.warnings++;
}

// Test functions
function testFileExists(filePath, description) {
  try {
    if (fs.existsSync(filePath)) {
      addTest(description, 'passed', `File exists: ${filePath}`);
      return true;
    } else {
      addTest(description, 'failed', `File missing: ${filePath}`);
      return false;
    }
  } catch (error) {
    addTest(description, 'failed', `Error checking file: ${error.message}`);
    return false;
  }
}

function testFileContent(filePath, description, validators) {
  try {
    if (!fs.existsSync(filePath)) {
      addTest(description, 'failed', `File missing: ${filePath}`);
      return false;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    let allValid = true;

    for (const validator of validators) {
      if (typeof validator === 'function') {
        const result = validator(content);
        if (!result.valid) {
          addTest(`${description} - ${result.name}`, 'failed', result.message);
          allValid = false;
        } else {
          addTest(`${description} - ${result.name}`, 'passed', result.message);
        }
      } else if (typeof validator === 'object') {
        const { name, test, message } = validator;
        if (test(content)) {
          addTest(`${description} - ${name}`, 'passed', message);
        } else {
          addTest(`${description} - ${name}`, 'failed', `Failed: ${message}`);
          allValid = false;
        }
      }
    }

    if (allValid) {
      addTest(description, 'passed', `All validations passed for ${filePath}`);
    }

    return allValid;
  } catch (error) {
    addTest(description, 'failed', `Error reading file: ${error.message}`);
    return false;
  }
}

function testBuildOutput() {
  log('Testing build output...', 'info');
  
  if (!testFileExists(TEST_CONFIG.buildOutput, 'Build output exists')) {
    return false;
  }

  const buildContent = fs.readFileSync(TEST_CONFIG.buildOutput, 'utf8');
  
  // Test for required components
  const requiredComponents = [
    'ha-vehicle-card',
    'ha-vehicle-card-editor',
    'discoverVehicles',
    'convertUnits'
  ];

  let allComponentsFound = true;
  for (const component of requiredComponents) {
    if (buildContent.includes(component)) {
      addTest(`Build contains ${component}`, 'passed', 'Component found in build');
    } else {
      addTest(`Build contains ${component}`, 'failed', 'Component missing from build');
      allComponentsFound = false;
    }
  }

  // Test for proper minification
  if (buildContent.length < 100000) {
    addTest('Build size reasonable', 'passed', `Build size: ${buildContent.length} bytes`);
  } else {
    addTest('Build size reasonable', 'warning', `Build size large: ${buildContent.length} bytes`);
  }

  return allComponentsFound;
}

function testPackageJson() {
  log('Testing package.json...', 'info');
  
  return testFileContent('package.json', 'Package.json validation', [
    {
      name: 'Has required fields',
      test: (content) => {
        const pkg = JSON.parse(content);
        return pkg.name && pkg.version && pkg.description;
      },
      message: 'Contains name, version, and description'
    },
    {
      name: 'Has build script',
      test: (content) => {
        const pkg = JSON.parse(content);
        return pkg.scripts && pkg.scripts.build;
      },
      message: 'Contains build script'
    },
    {
      name: 'Has Lit dependency',
      test: (content) => {
        const pkg = JSON.parse(content);
        return pkg.dependencies && pkg.dependencies.lit;
      },
      message: 'Contains Lit dependency'
    },
    {
      name: 'Has TypeScript dev dependency',
      test: (content) => {
        const pkg = JSON.parse(content);
        return pkg.devDependencies && pkg.devDependencies.typescript;
      },
      message: 'Contains TypeScript dev dependency'
    }
  ]);
}

function testTypeScriptConfig() {
  log('Testing TypeScript configuration...', 'info');
  
  return testFileContent('tsconfig.json', 'TypeScript config validation', [
    {
      name: 'Has proper target',
      test: (content) => {
        const config = JSON.parse(content);
        return config.compilerOptions && config.compilerOptions.target === 'ES2020';
      },
      message: 'Target set to ES2020'
    },
    {
      name: 'Has strict mode',
      test: (content) => {
        const config = JSON.parse(content);
        return config.compilerOptions && config.compilerOptions.strict === true;
      },
      message: 'Strict mode enabled'
    }
  ]);
}

function testHacsConfig() {
  log('Testing HACS configuration...', 'info');
  
  return testFileContent('hacs.json', 'HACS config validation', [
    {
      name: 'Has required fields',
      test: (content) => {
        const config = JSON.parse(content);
        return config.name && config.filename && config.country;
      },
      message: 'Contains name, filename, and country'
    },
    {
      name: 'Has correct filename',
      test: (content) => {
        const config = JSON.parse(content);
        return config.filename === 'ha-vehicle-card.js';
      },
      message: 'Filename set to ha-vehicle-card.js'
    }
  ]);
}

function testSourceFiles() {
  log('Testing source files...', 'info');
  
  let allValid = true;
  
  for (const file of TEST_CONFIG.sourceFiles) {
    if (!testFileExists(file, `Source file exists: ${file}`)) {
      allValid = false;
    }
  }
  
  return allValid;
}

function testDocumentation() {
  log('Testing documentation...', 'info');
  
  let allValid = true;
  
  // Test README
  if (testFileExists('README.md', 'README exists')) {
    const readmeContent = fs.readFileSync('README.md', 'utf8');
    
    const requiredSections = [
      'Features',
      'Installation',
      'Configuration',
      'Examples',
      'License'
    ];
    
    for (const section of requiredSections) {
      if (readmeContent.includes(section)) {
        addTest(`README contains ${section}`, 'passed', 'Section found');
      } else {
        addTest(`README contains ${section}`, 'failed', 'Section missing');
        allValid = false;
      }
    }
  } else {
    allValid = false;
  }
  
  // Test examples
  if (testFileExists('examples.yaml', 'Examples file exists')) {
    addTest('Examples file exists', 'passed', 'examples.yaml found');
  } else {
    addTest('Examples file exists', 'warning', 'examples.yaml missing');
  }
  
  // Test changelog
  if (testFileExists('CHANGELOG.md', 'Changelog exists')) {
    addTest('Changelog exists', 'passed', 'CHANGELOG.md found');
  } else {
    addTest('Changelog exists', 'warning', 'CHANGELOG.md missing');
  }
  
  return allValid;
}

function testImplementation() {
  log('Testing implementation...', 'info');
  
  let allValid = true;
  
  // Test types.ts
  if (testFileExists('src/types.ts', 'Types file exists')) {
    const typesContent = fs.readFileSync('src/types.ts', 'utf8');
    
    const requiredTypes = [
      'VehicleCardConfig',
      'VehicleNormalized',
      'Powertrain',
      'HomeAssistant'
    ];
    
    for (const type of requiredTypes) {
      if (typesContent.includes(type)) {
        addTest(`Types contains ${type}`, 'passed', 'Type found');
      } else {
        addTest(`Types contains ${type}`, 'failed', 'Type missing');
        allValid = false;
      }
    }
  } else {
    allValid = false;
  }
  
  // Test discovery.ts
  if (testFileExists('src/discovery.ts', 'Discovery file exists')) {
    const discoveryContent = fs.readFileSync('src/discovery.ts', 'utf8');
    
    const requiredFunctions = [
      'discoverVehicles',
      'convertUnits',
      'detectPowertrain'
    ];
    
    for (const func of requiredFunctions) {
      if (discoveryContent.includes(func)) {
        addTest(`Discovery contains ${func}`, 'passed', 'Function found');
      } else {
        addTest(`Discovery contains ${func}`, 'failed', 'Function missing');
        allValid = false;
      }
    }
  } else {
    allValid = false;
  }
  
  return allValid;
}

// Main test runner
async function runTests() {
  log('🚗 Starting BMW/MINI Vehicle Card Test Suite', 'info');
  log('=' .repeat(60), 'info');
  
  // Run all tests
  const tests = [
    { name: 'Source Files', fn: testSourceFiles },
    { name: 'Package.json', fn: testPackageJson },
    { name: 'TypeScript Config', fn: testTypeScriptConfig },
    { name: 'HACS Config', fn: testHacsConfig },
    { name: 'Build Output', fn: testBuildOutput },
    { name: 'Documentation', fn: testDocumentation },
    { name: 'Implementation', fn: testImplementation }
  ];
  
  for (const test of tests) {
    log(`Running ${test.name} tests...`, 'info');
    try {
      test.fn();
    } catch (error) {
      addTest(test.name, 'failed', `Test error: ${error.message}`);
    }
    log('', 'info');
  }
  
  // Print results
  log('=' .repeat(60), 'info');
  log('📊 Test Results Summary', 'info');
  log('=' .repeat(60), 'info');
  
  log(`✅ Passed: ${testResults.passed}`, 'success');
  log(`❌ Failed: ${testResults.failed}`, 'error');
  log(`⚠️  Warnings: ${testResults.warnings}`, 'warning');
  log(`📋 Total Tests: ${testResults.tests.length}`, 'info');
  
  // Print detailed results
  log('', 'info');
  log('📋 Detailed Results:', 'info');
  log('', 'info');
  
  for (const test of testResults.tests) {
    const status = {
      passed: '✅',
      failed: '❌',
      warning: '⚠️'
    }[test.status] || '❓';
    
    log(`${status} ${test.name}`, test.status);
    if (test.message) {
      log(`   ${test.message}`, 'info');
    }
  }
  
  // Final status
  log('', 'info');
  log('=' .repeat(60), 'info');
  
  if (testResults.failed === 0) {
    log('🎉 All tests passed! Implementation is ready.', 'success');
    process.exit(0);
  } else {
    log(`❌ ${testResults.failed} tests failed. Please fix issues before proceeding.`, 'error');
    process.exit(1);
  }
}

// Run tests if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runTests().catch(error => {
    log(`Test runner error: ${error.message}`, 'error');
    process.exit(1);
  });
}

export { runTests, testResults };
