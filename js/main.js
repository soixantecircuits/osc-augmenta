var socket = io(':' + config.port),
circle = {
  x:0,
  y:0
},
circlesArray =[],
numPeople = 0,
maxNumLine = 10;
function printLine(className, containerID, title, data){
  var className = className;
    var $container = $(containerID);
    var $content = $('<div/>', {
      html:'<br/><h2>$ N5D05@G4173 > '+ title +' : --</h2>'+'<p>'+JSON.stringify(data)+'</p>',
      'class':className + ' line'
    }).appendTo($container);
    godown($container, className);
}

  socket
  .on('bundle', function(data){
    //console.log(data.length);
    $.each(data, function(index, el){
      if(el.path === '/au/personEntered'){
        printLine('person-entered', '#data-people', 'PERSON ENTERED', el.data);
      } else if(el.path === '/au/personWillLeave'){
        printLine('person-will-leave', '#data-people', 'PERSON WILL LEAVE', el.data);
      } else if (el.path === '/au/personUpdated' ){
        //printLine('person-update', '#data-people', 'PERSON UPDATE', el.data);
        circlesArray.push({
          x: el.data.centroid.x,
          y: el.data.centroid.y
        });
      }
    });
  })
  .on('/au/personEntered', function(data){
    //console.log(data);
    printLine('person-entered', '#data-people', 'PERSON ENTERED', data);
    // printLine('person-entered', '#data-people', 'PERSON ENTERED', el.data);
  })
  .on('/au/personWillLeave', function(data){
    //console.log(data);
    printLine('person-will-leave', '#data-people', 'PERSON WILL LEAVE', data);
  })
  .on('/au/personUpdated', function(data){
    //console.log(data);
    if(circlesArray.length < numPeople){
      circlesArray.push({
        x: data.centroid.x,
        y: data.centroid.y
      });
    } else {
      circlesArray = [];
    }
    printLine('person-update', '#data-people', 'PERSON UPDATE', data);
  })
  .on('/au/scene', function(data){
    //console.log(data);
    numPeople = data.numPeople;
    var className = 'update-scene';
    var $container = $('#data-scene');
    var $content = $('<div/>$', {
      html:'<br/><h2>$ N5D05@G4173 > SCENE : --</h2>'+'<p>'+JSON.stringify(data)+'</p>',
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