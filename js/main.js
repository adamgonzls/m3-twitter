$(function () {


var user = {
  handle: '@bradwestfall',
  img: '../images/brad.png'
};


var tmpl = $('#template-tweet').text()
var tweetTmpl = Handlebars.compile(tmpl);

var threadHtml = $('#template-thread').text()
var threadTmpl = Handlebars.compile(threadHtml);

var composeHtml = $('#template-compose').text()
var composeTmpl = Handlebars.compile(composeHtml);


var renderTweet = function (user, message) {
	return tweetTmpl({
		userImg: user.img,
		userHandle: user.handle,
		tweetMessage: message
	});
};


var renderThread = function (tweet) {
	return threadTmpl({
		tweet: tweet,
		compose: composeTmpl()
	});
};


$('body').on('click', '.compose', function () {
	$(this).addClass('expand');
});


$('.tweets').on('click','.tweet', function () {  
	$(this).parent().toggleClass('expand');
});


$('body').on('submit', '.compose', function () {
	var tweetMessage = $(this).find('textarea').val()
	// console.log(tweetMessage)

	var newTweet = renderTweet(user, tweetMessage);
	console.log(newTweet);

	$(this).removeClass('expand').find('textarea').val('');

	if ($(this).parents('.thread').length) {
		
		$(this).parents('.replies').append(newTweet);
		// $(replies).append(this);
	} else {
		var newThread = renderThread(newTweet)
		$('.tweets').append(newThread);
	}
	return false;
}) 

});