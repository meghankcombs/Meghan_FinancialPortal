// TEMPLATE IN-LINE JS

// -------------------------------------------------------------------------
// Initialize DEMO sidebar

$(function () {
    pxDemo.initializeDemoSidebar();

    $('#px-demo-sidebar').pxSidebar();
    pxDemo.initializeDemo();
});

// -------------------------------------------------------------------------
// Initialize DEMO

$(function () {
    var file = String(document.location).split('/').pop();

    // Remove unnecessary file parts
    file = file.replace(/(\.html).*/i, '$1');

    if (!/.html$/i.test(file)) {
        file = 'index.html';
    }

    // Activate current nav item
    $('body > .px-nav')
        .find('.px-nav-item > a[href="' + file + '"]')
        .parent()
        .addClass('active');

    $('body > .px-nav').pxNav();
    $('body > .px-footer').pxFooter();

    $('#navbar-notifications').perfectScrollbar();
    $('#navbar-messages').perfectScrollbar();
});

// -------------------------------------------------------------------------
// Initialize scrollbars

$(function () {
    $('#support-tickets').perfectScrollbar();
    $('#recent-projects').perfectScrollbar();
    $('#index-comments').perfectScrollbar();
    $('#index-histories').perfectScrollbar();
    $('#threads').perfectScrollbar();
});

//--------------------------------------------------------------------------
// Initialize login page components

$(function () {
    $('.nav-tabs').pxTabResize();
    $('#account-bio').pxCharLimit();
});

// -------------------------------------------------------------------------
// Initialize balance chart

$(function () {
    if (pxUtil.default) { pxUtil = pxUtil.default; }

    var chartColor = pxDemo.getRandomColors(1)[0];
    var data = [pxDemo.getRandomData(40000, 20000), pxDemo.getRandomData(40000, 20000), pxDemo.getRandomData(40000, 20000), pxDemo.getRandomData(40000, 20000), pxDemo.getRandomData(40000, 20000), pxDemo.getRandomData(40000, 20000), pxDemo.getRandomData(40000, 20000), pxDemo.getRandomData(40000, 20000), pxDemo.getRandomData(40000, 20000), pxDemo.getRandomData(40000, 20000), 31600];

    $("#balance-chart").pxSparkline(data, {
        type: 'line',
        width: '100%',
        height: '60px',
        fillColor: pxUtil.hexToRgba(chartColor, 0.3),
        lineColor: chartColor,
        lineWidth: 1,
        spotColor: null,
        minSpotColor: null,
        maxSpotColor: null,
        highlightSpotColor: chartColor,
        highlightLineColor: chartColor,
        spotRadius: 3,
    });
});

// -------------------------------------------------------------------------
// Initialize line chart

$(function () {
    var data = [
        {
            label: 'Visits',
            data: [
                [6, pxDemo.getRandomData(250, 150)],
                [7, pxDemo.getRandomData(250, 150)],
                [8, pxDemo.getRandomData(250, 150)],
                [9, pxDemo.getRandomData(250, 150)],
                [10, pxDemo.getRandomData(250, 150)],
                [11, pxDemo.getRandomData(250, 150)],
                [12, pxDemo.getRandomData(250, 150)],
                [13, pxDemo.getRandomData(250, 150)],
                [14, pxDemo.getRandomData(250, 150)],
                [15, pxDemo.getRandomData(250, 150)]
            ],
        },
        {
            label: 'Returning visits',
            data: [
                [6, pxDemo.getRandomData(100, 0)],
                [7, pxDemo.getRandomData(100, 0)],
                [8, pxDemo.getRandomData(100, 0)],
                [9, pxDemo.getRandomData(100, 0)],
                [10, pxDemo.getRandomData(100, 0)],
                [11, pxDemo.getRandomData(100, 0)],
                [12, pxDemo.getRandomData(100, 0)],
                [13, pxDemo.getRandomData(100, 0)],
                [14, pxDemo.getRandomData(100, 0)],
                [15, pxDemo.getRandomData(100, 0)]
            ],
        }
    ];

    $.plot($('#flot-graph'), data, {
        series: {
            shadowSize: 0,
            lines: {
                show: true,
            },
            points: {
                show: true,
                radius: 4,
            },
        },

        grid: {
            color: '#999',
            borderColor: 'rgba(255, 255, 255, 0)',
            borderWidth: 1,
            hoverable: true,
            clickable: true,
        },

        xaxis: { tickColor: 'rgba(255, 255, 255, 0)', },
        tooltip: { show: true },
        colors: pxDemo.getRandomColors(),
    });
});

// -------------------------------------------------------------------------
// Initialize pie chart

$(function () {
    var data = [
        { label: 'Series1', data: pxDemo.getRandomData() },
        { label: 'Series2', data: pxDemo.getRandomData() },
        { label: 'Series3', data: pxDemo.getRandomData() },
        { label: 'Series4', data: pxDemo.getRandomData() },
        { label: 'Series5', data: pxDemo.getRandomData() },
        { label: 'Series6', data: pxDemo.getRandomData() },
        { label: 'Series9', data: pxDemo.getRandomData() },
    ];

    $.plot($('#flot-pie'), data, {
        series: {
            shadowSize: 0,
            pie: {
                show: true,
                radius: 1,
                innerRadius: 0.5,

                label: {
                    show: true,
                    radius: 3 / 4,
                    background: { opacity: 0 },

                    formatter: function (label, series) {
                        return '<div style="font-size:11px;text-align:center;color:white;">' + Math.round(series.percent) + '%</div>';
                    },
                },
            },
        },

        grid: {
            color: '#999',
            borderColor: 'rgba(255, 255, 255, 0)',
            borderWidth: 1,
            hoverable: true,
            clickable: true,
        },

        xaxis: { tickColor: 'rgba(255, 255, 255, 0)' },
        colors: pxDemo.getRandomColors(),
    });
});

// -----------------------------------------------------------------------------
// MY SCRIPTS

// TOOLTIP
$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});