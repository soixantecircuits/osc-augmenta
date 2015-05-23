var socket = io(':' + config.port),
circle = {
  x:0,
  y:0
},
circlesArray =[],
numPeople = 0,
maxNumLine = 20;
function printLine(className, containerID, title, data, index){
  if(typeof(index) !== undefined && index % 100 !== 0){
    return false;
  }
  var className = className;
  var $container = $(containerID);
  var $content = $('<div/>', {
    html:'<br/><h2>$ N5D05@G4173 > '+ title +' : --</h2>'+'<p>'+JSON.stringify(data)+'</p>',
    'class':className + ' line'
  }).appendTo($container);
  var randomNumber = getRandomInt(0,2);
  var needToGlitch = (randomNumber == 1)? true : false;
  if(needToGlitch){
  glitchTitle($content.find('h2'));
  glitchPhrase($content.find('p'));
  }
  godown($container, className);
}

  socket
  .on('bundle', function(data){
    //console.log(data.length);
    $.each(data, function(index, el){
      if(el.path === '/au/personEntered'){
        printLine('person-entered', '#data-people', 'PERSON ENTERED', el.data, index);
      } else if(el.path === '/au/personWillLeave'){
        printLine('person-will-leave', '#data-people', 'PERSON WILL LEAVE', el.data, index);
      } else if (el.path === '/au/personUpdated' ){
        printLine('person-update', '#data-people', 'PERSON UPDATE', el.data, index);
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
    var randomNumber = getRandomInt(0,2);
    var needToGlitch = (randomNumber == 1)? true : false;
    if(needToGlitch){
      glitchTitle($content.find('h2'));
      glitchPhrase($content.find('p'));
    }
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

var typoClasses = ['daedra', 'rune', 'etro', 'harpers'];

function glitchTitle($title){
  if($title.children('span').length == 0){
    $title.lettering();
  }
  var nbToGlitch = getRandomInt(2,5);
  for(var i=0; i<nbToGlitch;i++){
    var randomLetterIndex = getRandomInt(0,$title.children('span').length);
    var $letter = $($title.children('span')[randomLetterIndex]);
    $letter.addClass(typoClasses[getRandomInt(0,3)]);
  }
}
function glitchPhrase($phrase){
  if($phrase.children('span').length == 0){
    $phrase.lettering();
  }
  var $lettersToGlitch = [];
  var nbToGlitch = 30;

  for(var i=0; i<nbToGlitch; i++){
    var randomLetterIndex = getRandomInt(0,$phrase.children('span').length);
    var $letter = $($phrase.children('span')[randomLetterIndex]);
    $letter.addClass(typoClasses[getRandomInt(0,3)]);
  }
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}