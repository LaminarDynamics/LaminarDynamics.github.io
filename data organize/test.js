// 11-18-21

var selected_book = 0;
var selected_chapter = 0;
var selected_verse = 0;


function BookSelected() {
    selected_book = $("#book_selector").find(":selected").val();

    if (selected_book != "0") {
        $("#chapter_selector, #verse_selector").removeClass("hidden"); // Make Chapter Selector visible
        $("#chapter_selector, #verse_selector").addClass("show");

        // selected_chapter = $("#chapter_selector").find(":selected").val();
        GetBible(selected_book, selected_chapter, selected_verse);


    }

    else {
        $("#chapter_selector").addClass("hidden");
        $("#chapter_selector").removeClass("show");
    }
}

function ChapterSelected() {
    selected_chapter = $("#chapter_selector").find(":selected").val();
    GetBible(selected_book, selected_chapter, selected_verse);
}

function VerseSelected() {
    selected_verse = $("#verse_selector").find(":selected").val();
    GetBible(selected_book, selected_chapter, selected_verse);
}


function GetBible(book_num, selected_chapter, selected_verse) {
    $(".words").empty();

    $.getJSON("bible_kjv.json", function (bible) {

        let filtered_bible = bible[2].data;
        let book = GetBook(filtered_bible, book_num);
       
        var book_array = new Array();   
        var number_of_chapters = 0;
        book.forEach(element => {
           number_of_chapters = element.chapter; // Used to number of chapters in book
        });
        // console.log(number_of_chapters)
        for (let i = 0; i < number_of_chapters; i++) {
            book_array[i + 1] = new Array();       
        }

        book.forEach(element => {
            book_array[parseInt(element.chapter)][parseInt(element.verse)] = element.text;
            // book.splice(element.chapter, 0, [element.verse, element.text])
            // console.log("At [" + parseInt(element.chapter) + "][" + parseInt(element.verse) + "] add " + element.text)
        });

        
        console.table(book_array)
        console.log(book_array[1][1])


        // // Get how many chapters in book to draw chapter selector dropdown
        // var last = book[Object.keys(book)[Object.keys(book).length - 1]] // https://stackoverflow.com/questions/4317456/getting-the-last-item-in-a-javascript-object    
        // var how_many_chapters = parseInt(last.chapter);

        // $("#chapter_selector").empty();
        // for (let i = 0; i < how_many_chapters; i++) {
        //     $("#chapter_selector").append(`<option value="${i + 1}"">${i + 1}</option>`);
        // }



        // let chapter = GetChapter(book, selected_chapter);

        // // Get how many verses in chapter to draw chapter selector dropdown
        // var last = chapter[Object.keys(chapter)[Object.keys(chapter).length - 1]] // https://stackoverflow.com/questions/4317456/getting-the-last-item-in-a-javascript-object 
        // if (typeof last !== 'undefined') { // Need to check if var is defined yet, else it gets mad
        //     // console.log(last.verse)
        //     var how_many_verses = parseInt(last.verse);

        //     $("#verse_selector").empty();
        //     for (let i = 0; i < how_many_verses; i++) {
        //         $("#verse_selector").append(`<option value="${i + 1}"">${i + 1}</option>`);
        //     }
        // }






        // // Display whole chapter or just verse
        // if (selected_verse == 0) { // No verse selected
        //     var verse_number = 1;
        //     // $(".words").text(""); // Clear text area
        //     // $(".words").empty();

        //     chapter.forEach(verse => {
        //         $(".words").append(`<p id="${verse_number}""><span class="verse_num">${verse_number}&nbsp;&nbsp;&nbsp;</span>${verse.text}</p>`);
        //         verse_number++;
        //     });
        // }

        // if (selected_verse != 0) { // Display one verse
        //     let verse_object = GetVerse(chapter, selected_verse);
        //     verse = verse_object[0] // Need this else weird crap is returned
        //     $(".words").text(""); // Clear text area
        //     // console.log(verse)

        //     $(".words").empty();
        //     $(".words").append(`<p id="${verse.verse}"">${verse.verse}    ${verse.text}</p>`);
        // }


    });

}

function Do() {
    $(".words").empty();
}


function GetBook(bible, book_num) {
    return bible.filter(
        function (bible) {
            return bible.book == book_num
        }
    );
}

function GetChapter(book, chapter_num) {
    return book.filter(
        function (book) {
            return book.chapter == chapter_num
        }
    );
}

function GetVerse(chapter, verse_num) {
    return chapter.filter(
        function (chapter) {
            return chapter.verse == verse_num;
        }
    )
}