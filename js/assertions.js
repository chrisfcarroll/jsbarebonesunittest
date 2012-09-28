/*
Assertions for a test framework
*/

function Assert(actual, assertionGender){
    this.actual=actual;
    this.notted=!assertionGender;
    this.Expected=  assertionGender ? "Expected" : "Did not expect";
}

function assert(actual){return new Assert(actual, true);}
function assertNot(actual){return new Assert(actual, false);}

Assert.prototype.IsTrue = function(msg){
    if( this.actual == this.notted ){ throw msg||this.Expected + " true.";}
};

Assert.prototype.Equals = function(expected,msg){
    if( (this.actual==expected) == this.notted ){
        throw msg|| this.Expected + " " + this.actual + " to equal " + expected ;
    }
};

Assert.prototype.EqualsByPropertyValue = function(expected,msg){
    var actualValue =  JSON.stringify( this.actual );
    var expectedValue = JSON.stringify( expected );
    if( (actualValue == expectedValue) == this.notted ){
        throw msg|| this.Expected + " " + actualValue + " to equal " + expectedValue + " by value";
    }
};

$(function(){
    new Specification("SpecificationsForPrimitiveAssertionPasses",{
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

    new Specification("SpecificationsForPrimitiveAssertion_Failures",{
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
