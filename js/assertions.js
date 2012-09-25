/*
Assertions for a test framework
*/

function Assert(actual){this.actual=actual;}

function assert(actual){return new Assert(actual);}

Assert.prototype.IsTrue = function(msg){
    if(!this.actual){ throw msg||"Expected true but wasn't.";}
};

Assert.prototype.Equals = function(expected,msg){
    if(! (this.actual==expected) ){
        throw msg|| "Expected " + this.actual + " to equal " + expected ;
    }
};

Assert.prototype.EqualsByPropertyValue = function(expected,msg){
    var actualValue =  JSON.stringify( this.actual );
    var expectedValue = JSON.stringify( expected );
    if( actualValue != expectedValue ){
        throw msg|| "Expected " + actualValue + " to equal " + expectedValue ;
    }
};

$(function(){
    new Specification("SpecificationsForBasicAsserts",{
        isTrueShouldBeTrueForTrue : function(){
            assert(true).IsTrue();
        },
        equalsShouldPassForEqualArguments : function(){
            assert( 1+1 ).Equals( 2 );
        },
        equalsByPropertyValueShouldPassForValueEqualArguments : function(){
            assert( { a: "a", b : function(){ return "b";}} )
                .EqualsByPropertyValue( { a: "a", b : function(){ return "b";}} );
        }
    }).runTests();

    new Specification("FailureSpecificationsForBasicAsserts",{
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
        }
    }).runTests();
});
