var $navBar = $(".gallery");
var navItems = [
    {href: "images/terrence.jpg", likes: 5},
    {href: "images/harlem.jpg", likes: 3},
    {href: "images/jordan.jpg", likes: 2},
    {href: "images/russia.jpg", likes: 7}
];

function getLikes (image) {
    return "Likes: " + image.attr("data-likes");
}

function getFirstLike () {
    var $mainFig = $("[data-main-fig]");
    var $mainImg = $("img");
    $mainImg.attr("data-likes", navItems[0]["likes"]);
    var firstLike = getLikes($mainImg);
    var $firstCaption = $("<caption>");
    $mainFig.append($firstCaption);
    $firstCaption.text(firstLike);
}

// function getFirstLike () {
//     var mainFig = document.querySelector("[data-main-fig]");
//     var mainImg = document.getElementsByTagName("img")[0];
//     mainImg.setAttribute("data-likes", navItems[0]["likes"]);
//     var firstLike = getLikes(mainImg);
//     firstCaption = document.createElement("caption");
//     mainFig.appendChild(firstCaption);
//     firstCaption.textContent = firstLike;
// }

getFirstLike();

navItems.forEach(function (nav) {
    // grab location from current item in the array of photos
    // and create new <a> and <img> elements to store image
    var $newParent = $("<figure>");
    var $newChild = $("<a>");
    var $imgChild = $("<img>");
    var location = nav.href;
    var likes = nav.likes;
    
    // wrap the image tag in an anchor tag and set
    // appropriate attributes
    $newParent.append($newChild);
    $newChild.append($imgChild);
    $newChild.attr("href", location);

    $imgChild.attr("data-likes", likes);
    $newParent.attr("data-fig-item", "");

    $imgChild.addClass("thumb");
    $imgChild.attr("src", location);
    $imgChild.attr("href", location);

    // append the complete child to the navBar
    $navBar.append($newParent);
});

var IMG_SEL = "[data-target]";
var FIG_SEL = "[data-fig-item]";
var MAIN_FIG_SEL = "[data-main-fig]";
var OVERLAY_TARGET = "[data-overlay-target]";
var OVERLAY = ".overlay";

var $figItems = $(FIG_SEL);
var $imgTarget = $(IMG_SEL);
var $figTarget = $(MAIN_FIG_SEL);
var $overlayTarget = $(OVERLAY_TARGET);
var $overlay = $(OVERLAY);
var imageCounter = 0;


$figItems.each(function (index, value) {
    
    var $value = $(value);
    var $img = $value.find("img");

    $img.on('click', function (event) {
        event.preventDefault();
        var $newHref = $img.attr("href");
        //console.log($img);
        //console.log(event.target);
        //console.log($newHref);
        $imgTarget.attr("src", $newHref);

        for (var i = 0; i < navItems.length; i++) {
            if (navItems[i].href === $newHref) {
                imageCounter = navItems.indexOf(navItems[i]);
                break;
            }
        }

        // var $removal = $("caption");
        // console.log($removal);
        // // if ($removal !== undefined) {
        //     $figTarget.remove($removal);
        // // }

        $("caption").remove();

        var $caption = $("<caption>");
        var likes = getLikes($img);

        $figTarget.append($caption);
        $caption.text(likes);
    });
});

var $arrows = $("[data-arrow]");
//console.log($arrows);

$arrows.each(function (index, value) {

    //console.log(value);

    $value = $(value);

    $value.attr("href", "");
    // console.log(arrows);
    // console.log(arrow.getAttribute("href"));
    var $i = $value.find("i");
    var $className = $i.attr("class");
    //console.log($className);

    $value.on("click", function (event) {
        event.preventDefault();

        if ($className === "fa fa-arrow-circle-left") {
            imageCounter--;
            if (imageCounter < 0) {
                imageCounter += navItems.length;
            }

        } else {
            imageCounter++;
            if (imageCounter > navItems.length - 1) {
                imageCounter -= navItems.length;
            }      
        }
        
        var newUrl = navItems[imageCounter]["href"]
        //console.log(newUrl);
        var currentImage = navItems[imageCounter];
        //console.log(currentImage);
        newLikes = currentImage["likes"];
        //console.log(newLikes);
        $imgTarget.attr("src", newUrl);
        $imgTarget["data-likes"] = newLikes;

        var $mainFig = $("[data-main-fig]");
        var $caption = $("caption");
        //console.log(mainFig);

        // var removal = mainFig.querySelector("caption");
        // if (removal !== undefined) {
        //     mainFig.removeChild(removal);
        // }

        $caption.remove();

        $newCaption = $("<caption>");
        $newCaption.text("Likes: " + newLikes);
        $mainFig.append($newCaption);

    });
});

var $x = $(".fa-times");
//console.log(x);

$x.on('click', function (event) {
    event.preventDefault();
    
    var $removeOpacity = $(".opacity");
    // if ($removeOpacity !== undefined) {
    //     overlay.classList.remove("opacity");
    // }
    $removeOpacity.remove();
    $overlay.addClass("hidden");

});

$imgTarget.on("click", function (event) {
    var $overlay = $(".overlay");
    //console.log(overlay);
    $overlay.removeClass("hidden");

    var $source = $overlay.find("img");
    //console.log(source);

    $source.attr("src", $imgTarget.attr("src"));

    //var $overlayTarget = document.querySelector("[data-overlay-target]");
});

$input = $("[data-input='input-text']");
//console.log($input);

$input.attr("value", "enter konami");
$input.on("focus", function() {
    if ($input.val() === "enter konami") {
        $input.val("");
    }
});

$input.on("input", function(event) {
    event.preventDefault();
    //console.log($input.val());

    if ($input.val() === "konamito") {
        $overlay.addClass("reddish");
    }
});