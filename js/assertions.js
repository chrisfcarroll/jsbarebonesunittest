/*
Assertions for a test framework
*/

function assert(actual){return new AssertionBase(actual, true);}
function assertNot(actual){return new AssertionBase(actual, false);}

function AssertionBase(actual, assertionGender){
    this.actual=actual;
    this.notted=!assertionGender;
    this.TextExpected=  assertionGender ? "TextExpected" : "Did not expect";

    this.assert = function (result, msg) {
        if (result == this.notted) { throw msg ; }
    };
}

AssertionBase.prototype.IsTrue = function(msg){
    var defaultMessage = this.TextExpected + " true.";
    this.assert(this.actual, msg||defaultMessage);
};

AssertionBase.prototype.Equals = function(expected, msg){
    var defaultMessage = this.TextExpected + " " + this.actual + " to equal " + expected;
    this.assert( this.actual == expected, msg || defaultMessage);
};

AssertionBase.prototype.EqualsByPropertyValue = function(expected,msg){
    var actualValue =  JSON.stringify( this.actual );
    var expectedValue = JSON.stringify( expected );
    this.assert( actualValue == expectedValue,
        msg|| this.TextExpected + " " + actualValue + " to equal " + expectedValue + " by value"
    );
};

$(function(){
    new Specification("BasicAssertions_Specifications",{
        isTrueShouldBeTrueForTrue : function(){
            assert(true).IsTrue();
        },
        equalsShouldPassForEqualArguments : function(){
            assert( 1+1 ).Equals( 2 );
        },
        equalsByPropertyValueShouldPassForValueEqualArguments : function(){
            assert( { a: "a", b : function(){ return "b";}} )
                .EqualsByPropertyValue( { a: "a", b : function(){ return "b";}} );
        },
        assertNotShouldReverseTheOutcomeOfAnAssertion : function(){
            assertNot(false).IsTrue();
            assertNot(1+1).Equals(3);
            assertNot({ a: "a"}).EqualsByPropertyValue( { a: "b"});
        }
    }).runTests();

    new Specification("BasicAssertions_Specifications_ExpectedFails",{
        isTrueShouldNotBeTrueForFalse : function(){
            assert(false).IsTrue();
        },
        equalsShouldFailForNonEqualArguments : function(){
            assert(1).Equals(2);
        },
        equalsByPropertyValueShouldFailForDifferingPropertyValues : function(){
            assert( { a: "a" } ).EqualsByPropertyValue( { a: "A" } );
        },
        equalsByPropertyValueShouldFailForDifferingProperties : function(){
            assert( { a: "a" } ).EqualsByPropertyValue( { aa: "a" } );
        },
        assertNotShouldReverseTheOutcomeOfIsTrue : function(){
            assertNot(true).IsTrue();
            assertNot({ a: "a"}).EqualsByPropertyValue( { a: "a"});
        },
        assertNotShouldReverseTheOutcomeOfEquals : function(){
            assertNot(1+1).Equals(2);
        },
        assertNotShouldReverseTheOutcomeOfEqualsByValue : function(){
            assertNot({ a: "a"}).EqualsByPropertyValue( { a: "a"});
        },
        assertTrueFailureWithCustomerMessageShouldOutputCustomMessage : function(){
            assert(false).IsTrue("This assertion failure should output this custom message");
        },
        assertEqualsFailureWithCustomerMessageShouldOutputCustomMessage : function(){
            assert(1).Equals(2, "This assertion failure should output this custom message");
        },
        assertEqualsByValueFailureWithCustomerMessageShouldOutputCustomMessage : function(){
            assert({a:"a"}).EqualsByPropertyValue( 1, "This assertion failure should output this custom message");
        }

    }).runTests();
});
