//import $ from 'jquery';
//import mockjax from 'jquery-mockjax';

/* require('../../../static/js/jquery.mockjax'); */


(function() {
    console.log('oooooooooooooppp');
    console.log($);
    console.log($.mockajx);
    $.mockajx({
        url: '/app/goodsClass/queryClass',
        responseText: {
            status: 200,
            user: {
                hx: 1
            }
        }
    });
})()

/*  console.log($);
 //console.log(mockjax);
 console.log($.mockjax); */