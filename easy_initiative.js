jQuery(function($) {
    var panelList = $('#draggablePanelList');

    panelList.sortable({
        // Only make the .panel-heading child elements support dragging.
        // Omit this to make then entire <li>...</li> draggable.
        handle: '.panel-heading',
        update: function() {
            $('.panel', panelList).each(function(index, elem) {
                 var $listItem = $(elem),
                     newIndex = $listItem.index();
                 // Persist the new indices.
            });
        }
    });

    // Add a character when the add button is clicked.
    $('#add-button').click(function(){
      addCharacter();
    });

    // Sort the characters by initiative value when the sort button is clicked.
    $('#sort-button').click(function(){
      sortBars();
    });

    // Remove character from the initiative order.
    // TODO: finish this.


    // Add four characters to start.
    addCharacter();
    addCharacter();
    addCharacter();
    addCharacter();
});
var panelNum = 0
// This function will add a new panel that can then be filled out for a new character.
function addCharacter() {
    $( "#draggablePanelList" ).append(''.concat(
        "<li class='panel panel-info'>\
          <div class='panel-heading'>\
            <a class='remove-character'>\
              <i class='material-icons icon-hover-changer-1'>close</i>\
            </a>\
            <div class = 'character'>\
              <input class = 'input-box' type='text' name='character'>\
            </div>\
            <a class='toggle-body collapsed' data-toggle='collapse' data-target='#panel",panelNum,"'>\
              <i class='material-icons'>expand_more</i>\
            </a>\
            <div class = 'initiative'>\
              <input class = 'input-box' type='number' name='quantity' min='-9' max='99' data-sort=''>\
            </div>\
          </div>\
          <div id='panel",panelNum,"' class='collapse'>\
            <div class='panel-body'>\
              <div class='md-input-group'>\
                <input class = 'm-input' type='text' required>\
                <label><i class='fas fa-shield-alt'></i></label>\
              </div>\
            </div>\
          </div>\
        </li>\
        "
    ));

    var newpanel = $('#draggablePanelList .panel:last');

    // Attach data sort listener on the panel.
    $(newpanel).find('.input-box').on('input', function() {
      $(this).attr("data-sort", $(this).val());
    });

    // Attach the input limiter to the panel.
    // This limits the input to be less than 100.
    $(newpanel).find('.input-box').on('keydown keyup', function(e){
      if ($(this).attr('data-sort') > 99
        && e.keyCode != 46 // delete
        && e.keyCode != 8 // backspace
      ){
        e.preventDefault();
        $(this).val($(this).attr('data-prev'));
        // $(this).val($(this).attr('data-prev'));
      }else{
        $(this).attr('data-prev', $(this).attr('data-sort'));
      }
    });

    // Allow users to remove a panel
    $(newpanel).find('.remove-character').click(function(e){
      e.preventDefault();
      newpanel.remove();
    });

    panelNum++;
}

// This function will sort the Bars based on their current initiative value.
function sortBars() {
  $('.panel').sort(function (a, b) {
    var contentA =parseInt( $(a).find('.initiative > input').attr('data-prev'));
    var contentB =parseInt( $(b).find('.initiative > input').attr('data-prev'));
    return (contentA < contentB) ? 1 : (contentA > contentB) ? -1 : -1;
  }).appendTo($("#draggablePanelList"));
}
