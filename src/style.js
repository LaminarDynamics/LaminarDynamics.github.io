// 11-18-21
// 11-21-21
// 11-26-21
// 11-27-21
// 12-12-21
// 12-21-21


// Anti-horizontal scroll
$(function () {

    var $body = $(document);
    $body.bind('scroll', function () {
        // "Disable" the horizontal scroll.
        if ($body.scrollLeft() !== 0) {
            $body.scrollLeft(0);
        }
    });

});

// // Verse Div Clicked
// function VerseClicked(this_verse) {
//     console.log(this_verse)
//     // $(this_verse).css({ 'transform': 'rotateY(' + 180 + 'deg)' });

//     if (!$(this_verse).hasClass(".flipped")) {
//         console.log("Flip")
//         $(this_verse).addClass(".flipped");
//         $(this_verse).css({ 'transform': 'rotateY(' + 180 + 'deg)' });

//         // $(this_verse).css({'display': 'none'});
//         // let back_html = "<p>Back of card of card</p><button>Click Me</button>";

//         // $(".verse_back").append(back_html);
//         // let childrens = $(this_verse).children();
//         // // let verse_back1 = $(this_verse)[0];
//         // // let verse_back = $(verse_back1)[0];
//         // // verse_back = $(this_verse).get(1);
//         // console.log(typeof(childrens))
//         // console.log(childrens)

//         // $(childrens).removeClass(".hidden");

//         // console.log($(this_verse).parent().find('verse_back'));
//     }
//     else {
//         console.log("Unflip")
//         $(this_verse).removeClass(".flipped");
//         $(this_verse).css({ 'transform': 'rotateY(' + 0 + 'deg)' });
//     }

// }


// Scroll stuff for sticky menu
var scroll_pos = $(window).scrollTop();
$(window).scroll(function () {

    DivAlter()


});


function DivAlter() {

    $(".verse_div").each(function (i, val) {

        var div_details = this.getBoundingClientRect();
        screen_height = window.innerHeight;


        if (div_details.top < 0 && div_details.bottom > 0) {  // Fires when div is at top edge, but not hidden yet
            // console.log($(this).html() + " at top edge");
            UpperDiv(this, div_details)
        }

        if (div_details.bottom > screen_height && div_details.top < screen_height) {  // Div at bottom edge, but not hidden yet
            // console.log($(this).html() + " at bottom edge");
            $(this).css({ 'border-color': 'blue' });
        }

        if (div_details.top > 0 && div_details.bottom < screen_height) { // Div inside of screen borders on both top and bottom
            $(this).css({ 'border-color': '#5c8db4' });
            // $(this).stop();
            $(this).css("transform", `translateX(0px)`);
        }

        if (div_details.bottom < 0) {
            // $(this).css("transform", `translateX(0px)`);
        }

    })
}


function SlideDiv(target_div) {
    // $(target_div).css({ "left": `${-200}px` })
}


function UpperDiv(upper_verse_info, upper_verse_pos) {
    // console.log(upper_verse_info)
    $(upper_verse_info).css({ 'border-color': 'red' });

    var persent_showing = upper_verse_pos.bottom / upper_verse_pos.height;
    var persent_hidden = 1 - persent_showing;
    var slide_amount = persent_hidden * upper_verse_pos.width;
    // var flip_deg = persent_showing * upper_verse_info;

    // console.log("veresse withd" + upper_verse_pos.width)
    // console.log(persent_hidden)
    // console.log("Slide amount " + slide_amount)

    $(upper_verse_info).css("transform", `translateX(${slide_amount}%)`);

}