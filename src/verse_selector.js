// 11-17-21
// 11-18-21
// 11-21-21
// 12-14-21




var book_array = new Array();

function BookSelected() {
    selected_book = $("#book_selector").find(":selected").val();


    if (selected_book != "0") {
        $(".words").empty();

        $("#chapter_selector, #verse_selector").removeClass("hidden"); // Make Chapter Selector visible
        $("#chapter_selector, #verse_selector").addClass("show");

        GetBible(selected_book);
    }

    else {
        $("#chapter_selector").addClass("hidden");
        $("#chapter_selector").removeClass("show");
    }

}

function ChapterSelected() {
    if ($("#chapter_selector").find(":selected").val() != 0) {
        $("#verse_selector").val("0").change();
        DisplayBible()
    }
}

function VerseSelected() {
    DisplayBible()
}


function DisplayBible() {

    selected_chapter = parseInt($("#chapter_selector").find(":selected").val());
    selected_verse = parseInt($("#verse_selector").find(":selected").val());


    let verse_ident = 777777;

    let how_many_verses = book_array[selected_chapter].length

    if (selected_verse == 0) {

        $("#verse_selector").empty();
        $("#verse_selector").append(`<option value="0">All</option>`);
        for (let i = 0; i < how_many_verses - 1; i++) { // Need -1 else extra verse option is created
            $("#verse_selector").append(`<option value="${i + 1}"">${i + 1}</option>`);
        }
    }

    // Display whole chapter or just verse
    if (selected_verse == 0) { // No verse selected

        $(".words").empty();

        for (let i = 1; i < how_many_verses; i++) {
            let current_verse = book_array[selected_chapter][i];

            let da_html = `<div onclick="VerseClicked(this)" class="verse_div"><div class="verse_front"><p id="${i}""><span class="verse_num">${i}&nbsp;&nbsp;&nbsp;</span><span class="verse">${current_verse}</span></p></div><div class="verse_back">${VerseBack(verse_ident)}</div></div>`;

            if (da_html.includes("‹")) { // If verse contains opening symbol for Jesus' words
                $(".words").append(RedLetter(da_html));
            }
            else { // If no Jesus words
                $(".words").append(da_html);
            }
        }

    }

    if (selected_verse != 0) { // Display one verse

        $(".words").empty();
        let da_html = `<div onclick="VerseClicked(this)" class="verse_div"><p id="${selected_verse}""><span class="verse_num">${selected_verse}&nbsp;&nbsp;&nbsp;</span><span class="verse">${book_array[selected_chapter][selected_verse]}</span></p></div>`;

        if (da_html.includes("‹")) { // If verse contains opening symbol for Jesus' words
            $(".words").append(RedLetter(da_html));
        }
        else { // If no Jesus words
            $(".words").append(da_html);
        }

    }

}


function GetBible(book_num) {

    $.getJSON("src/bible_kjv.json", function (bible) {

        let filtered_bible = bible[2].data;
        let book = GetBook(filtered_bible, book_num);


        var number_of_chapters = 0;
        book.forEach(element => {
            number_of_chapters = element.chapter; // Used to number of chapters in book
        });


        for (let i = 0; i < number_of_chapters; i++) {
            book_array[i + 1] = new Array();
        }

        book.forEach(element => {
            book_array[parseInt(element.chapter)][parseInt(element.verse)] = element.text;
        });

        $("#chapter_selector").empty();
        $("#chapter_selector").append(`<option value="0">Chapter</option>`);
        for (let i = 0; i < number_of_chapters; i++) {
            $("#chapter_selector").append(`<option value="${i + 1}"">${i + 1}</option>`);
        }

    });

}

function GetBook(bible, book_num) {
    return bible.filter(
        function (bible) {
            return bible.book == book_num
        }
    );
}


function RedLetter(my_html) { // If verse contains Jesus' words
    my_html = my_html.replace("‹", "<span style='color: #ff3b00;'>"); // Replace opening symbol for Jesus words with color styler

    if (my_html.includes("›")) {
        my_html = my_html.replace("›", "</span>"); // Close Jesus' words color styler
    }
    return my_html;
}

function VerseBack(this_verse) {
    let back_html = "";
    return back_html;
}