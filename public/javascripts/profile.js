$('#myTabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})

$('#myTabs a[href="#profile"]').tab('show') // Select tab by name
