(function( $ ){
    $.fn.tsvMenuPlugin = function(options){
        var defaultOptions = {
            url:"www.example.com"
        };
        options = $.extend(defaultOptions, options);
        
        var menu = this,
            preparedElement,
            menuElements,
            buildMenu = function(menuElements){
                var notAdded = [];
                $.each(menuElements, function(k,v){
                    preparedElement = $('<li>').attr('id', v.id).append($('<a>').attr('href', v.link).text(v.name));
                    if(v.toplevel){
                        menu.children('ul').append(preparedElement);
                    } else if((v.parent!= null) && (typeof(v.parent) != "undefined")){
                        if($('#'+v.parent.id).length != 0){
                            if($('#'+v.parent.id).children('ul').length == 0) $('#'+v.parent.id).append($("<ul></ul>"));
                            $('#'+v.parent.id).children('ul').append(preparedElement);
                        } else {
                            notAdded.push(v);
                        }
                    }
                });
                
                if(notAdded.length) buildMenu(notAdded);
                return false;
            };
           
        $.ajax({
                crossDomain: true,
                type: "GET",
                url: options.url,
                dataType: "json",
                success: function( data ) {
                    console.log(data);
                    buildMenu(data);
                    
                }
        });
    }
})(jQuery)