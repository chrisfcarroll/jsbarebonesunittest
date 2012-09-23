/**
 * Created with JetBrains WebStorm.
 * User: carrolls
 * Date: 23/09/2012
 * Time: 22:59
 * To change this template use File | Settings | File Templates.
 */

function getMyName( functionText ) {
    var testName = functionText.toString() ;
    testName = testName.substr('function '.length);
    testName = testName.substr(0, testName.indexOf('('));
    return testName;
}

