$(document).ready(function () {
    var itemsMainDiv = ('.MultiCarousel');
    var itemsDiv = ('.MultiCarousel-inner');
    var itemWidth = "";

    $('.leftLst, .rightLst').click(function () {
        var condition = $(this).hasClass("leftLst");
        if (condition)
            click(0, this);
        else
            click(1, this)
    });

    ResCarouselSize();

    // Auto-play functionality
    var autoPlayInterval = setInterval(function () {
        autoPlayCarousel();
    }, 5000); // 5 seconds

    $(window).resize(function () {
        ResCarouselSize();
    });

    // This function defines the size of the items
    function ResCarouselSize() {
        var incno = 0;
        var dataItems = ("data-items");
        var itemClass = ('.item');
        var id = 0;
        var btnParentSb = '';
        var itemsSplit = '';
        var sampwidth = $(itemsMainDiv).width();
        var bodyWidth = $('body').width();
        $(itemsDiv).each(function () {
            id = id + 1;
            var itemNumbers = $(this).find(itemClass).length;
            btnParentSb = $(this).parent().attr(dataItems);
            itemsSplit = btnParentSb.split(',');
            $(this).parent().attr("id", "MultiCarousel" + id);

            if (bodyWidth >= 1200) {
                incno = itemsSplit[3];
                itemWidth = sampwidth / incno;
            } else if (bodyWidth >= 992) {
                incno = itemsSplit[2];
                itemWidth = sampwidth / incno;
            } else if (bodyWidth >= 768) {
                incno = itemsSplit[1];
                itemWidth = sampwidth / incno;
            } else {
                incno = itemsSplit[0];
                itemWidth = sampwidth / incno;
            }
            $(this).css({
                'transform': 'translateX(0px)',
                'width': itemWidth * itemNumbers
            });
            $(this).find(itemClass).each(function () {
                $(this).outerWidth(itemWidth);
            });

            $(".leftLst").addClass("over");
            $(".rightLst").removeClass("over");
        });
    }

    // This function is used to move the items
    function ResCarousel(e, el, s) {
        var leftBtn = ('.leftLst');
        var rightBtn = ('.rightLst');
        var translateXval = '';
        var divStyle = $(el + ' ' + itemsDiv).css('transform');
        var values = divStyle.match(/-?[\d\.]+/g);
        var xds = Math.abs(values[4]);
        if (e == 0) {
            translateXval = parseInt(xds) - parseInt(itemWidth * s);
            $(el + ' ' + rightBtn).removeClass("over");

            if (translateXval <= itemWidth / 2) {
                translateXval = 0;
                $(el + ' ' + leftBtn).addClass("over");
            }
        } else if (e == 1) {
            var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
            translateXval = parseInt(xds) + parseInt(itemWidth * s);
            $(el + ' ' + leftBtn).removeClass("over");

            if (translateXval >= itemsCondition - itemWidth / 2) {
                translateXval = itemsCondition;
                $(el + ' ' + rightBtn).addClass("over");
            }
        }
        $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
    }

    // This function is used to get some elements from btn
    function click(ell, ee) {
        var Parent = "#" + $(ee).parent().attr("id");
        var slide = $(Parent).attr("data-slide");
        ResCarousel(ell, Parent, slide);
    }

    // This function is used for autoplay
    function autoPlayCarousel() {
        $('.MultiCarousel').each(function () {
            var rightBtn = $(this).find('.rightLst');
            click(1, rightBtn);
        });
    }
});


// /////////////////////   Indicator
$(document).ready(function () {
    $('.step').click(function () {
        // Remove 'active' class from all steps and content sections
        $('.step').removeClass('active');
        $('.content-section').removeClass('active');

        // Add 'active' class to the clicked step and its content section
        $(this).addClass('active');
        var target = $(this).data('target');
        $(target).addClass('active');
    });

    // Optionally, trigger the first step on page load
    $('.step').first().click();
});




//  fouth portion 

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".collaspe_button button");
    const contents = document.querySelectorAll(".content");

    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            contents.forEach((content, contentIndex) => {
                if (contentIndex === index) {
                    content.style.display = "block";
                } else {
                    content.style.display = "none";
                }
            });
        });
    });
});


// side Timer
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        checkboxes.forEach(cb => {
            if (cb !== this) cb.checked = false;
        });
        updateTimeline();
    });
});

function updateTimeline() {
    checkboxes.forEach(checkbox => {
        const parent = checkbox.parentElement;
        const circle = parent.querySelector('.circle');
        if (checkbox.checked) {
            circle.classList.add('selected');
        } else {
            circle.classList.remove('selected');
        }
    });
}

// Initialize timeline on load
document.addEventListener('DOMContentLoaded', updateTimeline);


// ==================================== section 3 


function showContent(contentId) {
    var content1 = document.getElementById('content1-bottom-section');
    var content2 = document.getElementById('content2-bottom-section');

    content1.style.display = 'none';
    content2.style.display = 'none';

    document.getElementById(contentId).style.display = 'block';
}

// To ensure the default state shows one content, you can trigger it on page load:
document.addEventListener('DOMContentLoaded', function () {
    showContent('content1-bottom-section');
});
document.querySelectorAll('.plan-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const planId = this.getAttribute('data-plan');
        document.querySelectorAll('.plan-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(planId).classList.add('active');
    });
});