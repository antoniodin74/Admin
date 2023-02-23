/*
Template Name: Minible - Admin & Dashboard Template
Author: Themesbrand
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: Datatables Js File
*/

$(document).ready(function() {
    $('#datatable').DataTable();

    //Buttons examples
    var table = $('#datatable-buttons').DataTable({
        lengthChange: false,
        buttons: ['copy', 'excel', 'pdf', 'colvis']
    });

    table.buttons().container()
        .appendTo('#datatable-buttons_wrapper .col-md-6:eq(0)');
        
        $(".dataTables_length select").addClass('form-select form-select-sm');


    $('#datatable1').DataTable();
    
     //Buttons examples
     var table = $('#datatable1-buttons').DataTable({
        lengthChange: false,
        buttons: ['copy', 'excel', 'pdf', 'colvis']
    });
    
    table.buttons().container()
        .appendTo('#datatable1-buttons_wrapper .col-md-6:eq(0)');
        
        $(".dataTables_length select").addClass('form-select form-select-sm');
   
        
        document.getElementById("scompare").style.display = "none";
        $("#btReset").click(function() {
        $("#frmSelezioni")[0].reset();
    });
        $("#btSave").click(function() {
            var anno = $("#anno").val();
            console.log(anno);
            var nrreg = $("#nrreg").val();
            console.log(nrreg);
            var deroga = $("#deroga").val();
            console.log(deroga);
            var tpbol = $("#tpbol").val();
            console.log(tpbol);
            var nrbol = $("#nrbol").val();
            console.log(nrbol);
            var dtini = $("#dtini").val();
            var aa = dtini.substring(6, 10);
            var mm = dtini.substring(3, 5);
            var gg = dtini.substring(0, 2);
            var dtini = aa+mm+gg;
            console.log(dtini);
            var dtfin = $("#dtfin").val();
            var aa = dtfin.substring(6, 10);
            var mm = dtfin.substring(3, 5);
            var gg = dtfin.substring(0, 2);
            var dtfin = aa+mm+gg;
            console.log(dtfin);
            var stato = $("#stato").val();
            console.log(stato);
        });
} );