var socket = io(':' + config.port),
maxNumLine = 100;
  socket
  .on('/au/personEntered', function(data){
    //console.log(data);
    var className = 'person-entered';
    var $container = $('#data-people');
    var $content = $('<div/>', {
      html:'<h2>-PERSON ENTERED : --</h2><br/>'+'<p>'+JSON.stringify(data)+'</p>',
      'class':className + ' line'
    }).appendTo($('#data-people'));
    godown($container, className);
  })
  .on('/au/personWillLeave', function(data){
    //console.log(data);
    var className = 'person-will-leave';
    var $container = $('#data-people');
    var $content = $('<div/>', {
      html:'<h2>-PERSON WILL LEAVE : --</h2><br/>'+'<p>'+JSON.stringify(data)+'</p>',
      'class':className + ' line'
    }).appendTo($('#data-people'));
    godown($container, className);
  })
  .on('/au/personUpdated', function(data){
    //console.log(data);
    var className = 'person-update';
    var $container = $('#data-people');
    var $content = $('<div/>', {
      html:'<h2>-PERSON UPDATE : --</h2><br/>'+'<p>'+JSON.stringify(data)+'</p>',
      'class':className + ' line'
    }).appendTo($('#data-people'));
    godown($container, className);
  })
  .on('/au/scene', function(data){
    //console.log(data);
    var className = 'update-scene';
    var $container = $('#data-scene');
    var $content = $('<div/>', {
      html:'<h2>-SCENE : --</h2><br/>'+'<p>'+JSON.stringify(data)+'</p>',
      'class':className + ' line'
    }).appendTo($container);
    $('#people').html(data.numPeople);
    godown($container, className);
  })

  function godown($el, className){
    var $elementArray = $('.'+className);
    if($elementArray.length > maxNumLine){
      for (var i = 0; i < maxNumLine/2; i++){
        $elementArray[i].remove();
      }
    }
    $el.scrollTop($elementArray.length*$elementArray.height());
  }