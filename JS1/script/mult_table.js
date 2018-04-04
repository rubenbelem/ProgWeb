document.writeln("<div class=\"group-of-5-tables\">");
for (var i = 1; i <= 10; i++) {
    document.writeln("<table class=\"table table-bordered table-hover mult-table\"" + ((i % 5)? "style=\"margin-right: 30px;\"":"" ) + "><tr><th colspan=\"2\">Produtos de " + i.toString()) + "</th></tr>";
    for (var j = 1; j <= 10; j++ ) {
        document.writeln("<tr><td>" + i.toString() + "x" + j.toString() + "</td><td>" + (i * j).toString() + "</td></tr>");
    }
    document.writeln("</table>");

    if (i == 5) {
        document.writeln("</div>");
        document.writeln("<div class=\"group-of-5-tables\" style=\"margin-bottom: 40px;\">");
    }
}
document.writeln("</div>")
