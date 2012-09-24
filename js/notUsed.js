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

function wikiWordToSpacedWord(wikiWord){
    var result= "";
    for (var word in wikiWord.split("(?<!(^|[A-Z]))(?=[A-Z])|(?<!^)(?=[A-Z][a-z])")) {
        result +=word;
    }
}

$(function(){
    new Specification("FunctionsSpecification", {
        wikiWordToSpacedWordShouldPutSpacesInForCapitals : function(){
            var result= wikiWordToSpacedWord("wikiWordToSpacedWordShouldPutSpacesInForCapitals");
            var expected= "Wiki Word To Spaced Word Should Put Spaces In For Capitals";
            return expected==result;
        }
    }).runTests();
});