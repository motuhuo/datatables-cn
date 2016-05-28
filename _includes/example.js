<script src="{{site.baseurl}}/js/dataTables.bootstrap.js"></script>
<script >
/**
 * Created by datatables.club on 2016/4/4.
 */

var example = {
    /**
     * 渲染模板文件
     * @param tplobj
     * @param data
     * @param id
     */
    renderFun: function (id, data) {
        //var tplobj = $('#' + id).html();
        var tplobj = document.getElementById(id).innerHTML;
        var tpl = laytpl(tplobj);
        console.log(tplobj);
        console.log(data);
        console.log(tpl);
        return tpl.render(data);
    },
    /**
     * 创建表格
     * @param divid
     * @param data
     */
    createTable: function (data) {
        //var tableHtml = example.renderFun("exampleTableHtml", data);
        //$("#" + data.divId).html(tableHtml);
        var columns = [
            {
                "class": 'details-control',
                "orderable": false,
                "data": null,
                "defaultContent": ''
            },
            {"data": null},
            {"data": null}
        ];
        var columnDefs = [
            {
                "targets": 2,
                "render": function (data, type, row, meta) {
                    var url = "";
                    if (row.url) {
                        url += '<a href="' + row.url + '" target="_blank">中文</a>';
                    }
                    if(row.url && row.enurl){
                        url += " | ";
                    }
                    if (row.enurl) {
                        url += '<a href="' + row.enurl + '" target="_blank">English</a>';
                    }
                    return url;
                }
            },
            {
                "targets": 1,
                "render": function (data, type, row, meta) {
                    if(row.url){
                        return "<a href="+row.url+" target='_blank'>"+row.name + "(" + row.en + ")</a>";
                    }
                    if(row.en){
                        return row.name + "(" + row.en + ")";
                    }
                    return row.name;
                }
            }
        ];

        var order = [[1, 'asc']];
        return example.config(data.tableId, data.url,columns,columnDefs,order);
    },
    createDailyTable:function(data){
        var columns = [
            {
                "class": 'details-control',
                "orderable": false,
                "data": null,
                "defaultContent": ''
            },
            {"data": "name"},
            {"data": "date"},
            {"data": null}
        ];
        var columnDefs = [
            {
                "targets": 3,
                "render": function (data, type, row, meta) {
                    return "<a href='"+row.url+"' target='_blank'>学习此技能</a>";
                }
            }
        ];

        var order = [[2, 'desc']];
        return example.config(data.tableId, data.url,columns,columnDefs,order);
    },
    /**
     * datatable 初始化
     * @param id
     * @param url 数据源
     * @param columns 列属性绑定
     * @param columnDefs 列渲染
     * @returns {jQuery}
     */
    config: function (id, url, columns, columnDefs,order) {
        return $("#" + id).DataTable({
            "ajax": url,
            "lengthChange": false,
            "paging": false,
            "searching": false,
            "columns": columns,
            "order": order,
            "columnDefs": columnDefs
        });
    },
    format: function (d) {
        // `d` is the original data object for the row
        return '<p>'+(d.content||"暂无")+'</p>';
    },
    formatiframe: function (d) {
        var url = d.url;
        url = url.substr(0, url.length - 5);
        url = url + "-detail";
        return '<iframe style="margin: 10px 0 20px 0" height=500px width=100% src="' + url + '" frameborder=0 allowfullscreen></iframe>';
    },
    /**
     * detail事件监听
     */
    eventListen: function (tableid,oTable) {
        $('#'+tableid+' tbody').on('click', 'td.details-control', function () {
            var tr = $(this).closest('tr');
            var row = oTable.row(tr);
            if (row.child.isShown()) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
            }
            else {
                // Open this row
                row.child(example.format(row.data())).show();
                tr.addClass('shown');
            }
        });
    },
    dailyEventListen: function (tableid,oTable) {
        $('#'+tableid+' tbody').on('click', 'td.details-control', function () {
            var tr = $(this).closest('tr');
            var row = oTable.row(tr);
            if (row.child.isShown()) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
            }
            else {
                // Open this row
                row.child(example.formatiframe(row.data())).show();
                tr.addClass('shown');
            }
        });
    },
    "init": function () {
        var user_share_data = {
            tableId: "user_share_table",
            title: "网友共享",
            url: "{{site.baseurl}}/assets/example/user_share_json.txt",
            divId: "user_share"
        };
        example.eventListen(user_share_data.tableId, example.createTable(user_share_data));

        var basic_init_data = {
            tableId: "basic_init_table",
            title: "基本初始化",
            url: "{{site.baseurl}}/assets/example/basic_init_json.txt",
            divId: "basic_init"
        };
        example.eventListen(basic_init_data.tableId, example.createTable(basic_init_data));

        var advanced_init_data = {
            tableId: "advanced_init_table",
            title: "高初始化",
            url: "{{site.baseurl}}/assets/example/advanced_init_json.txt",
            divId: "basic_init"
        };
        example.eventListen(advanced_init_data.tableId, example.createTable(advanced_init_data));

        var styling_data = {
            tableId: "styling_table",
            title: "样式",
            url: "{{site.baseurl}}/assets/example/styling_json.txt",
            divId: "styling"
        };
        example.eventListen(styling_data.tableId, example.createTable(styling_data));

        var data_sources = {
            tableId: "data_sources_table",
            title: "数据源",
            url: "{{site.baseurl}}/assets/example/data_sources_json.txt",
            divId: "data_sources"
        };
        example.eventListen(data_sources.tableId, example.createTable(data_sources));

        var api_sources = {
            tableId: "api_table",
            title: "API",
            url: "{{site.baseurl}}/assets/example/api_json.txt",
            divId: "api"
        };
        example.eventListen(api_sources.tableId, example.createTable(api_sources));


        var ajax_sources = {
            tableId: "ajax_table",
            title: "AJAX",
            url: "{{site.baseurl}}/assets/example/ajax_json.txt",
            divId: "ajax"
        };
        example.eventListen(ajax_sources.tableId, example.createTable(ajax_sources));


        var server_side_sources = {
            tableId: "server_side_table",
            title: "Server-side",
            url: "{{site.baseurl}}/assets/example/server_side_json.txt",
            divId: "server_side"
        };
        example.eventListen(server_side_sources.tableId, example.createTable(server_side_sources));

        var plug_ins_sources = {
            tableId: "plug_ins_table",
            title: "Plug-ins",
            url: "{{site.baseurl}}/assets/example/plug_ins_json.txt",
            divId: "plug_ins"
        };
        example.eventListen(plug_ins_sources.tableId, example.createTable(plug_ins_sources));


        var vedio1_sources = {
            tableId: "vedio1_table",
            title: "Datatables入门视频",
            url: "{{site.baseurl}}/assets/example/vedio_json.txt",
            divId: "vedio1"
        };
        example.eventListen(vedio1_sources.tableId, example.createTable(vedio1_sources));

        var vedio2_sources = {
            tableId: "vedio2_table",
            title: "",
            url: "{{site.baseurl}}/assets/example/vedio_user_share_json.txt",
            divId: "vedio2"
        };
        example.eventListen(vedio2_sources.tableId, example.createTable(vedio2_sources));

    },
    "dailyInit":function(){
        var daily_sources = {
            tableId: "2016-04_table",
            title: "",
            url: "{{site.baseurl}}/assets/daily/2016-04_json.txt",
            divId: ""
        };
        example.dailyEventListen(daily_sources.tableId, example.createDailyTable(daily_sources));

        var daily_05_sources = {
            tableId: "2016-05_table",
            title: "",
            url: "{{site.baseurl}}/assets/daily/2016-05_json.txt",
            divId: ""
        };
        example.dailyEventListen(daily_05_sources.tableId, example.createDailyTable(daily_05_sources));

    }
};

</script >