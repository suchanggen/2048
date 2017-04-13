var board = new Array();
var score = 0;
var infoleft=37;
var infoup=38;
var inforight=39;
var infodown=40;
var deal=0;
var maxnum=2;
$(document).ready(function(){
    newgame();
});
function newgame(){
    //初始化棋盘格
    init();
    //在随机两个格子生成数字
    GetOneNumber();
    GetOneNumber();
}
function init(){
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ ){

            var box_now = $('#box-'+i+"-"+j);
            box_now.css('top', 20+i*120);
            box_now.css('left', 20+j*120);
        }
    for( var i = 0 ; i < 4 ; i ++ ){
        board[i] = new Array();

        for( var j = 0 ; j < 4 ; j ++ ){
            board[i][j] = 0;
        }
    }
    updateBoardView();
    score = 0;
}
function updateBoardView(){

    $(".box_num").remove();
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ ){
            $("#main_box").append( '<div class="box_num" id="box_num-'+i+'-'+j+'"></div>' );
            var box_num_now = $('#box_num-'+i+'-'+j);
            if( board[i][j] == 0 ){
                box_num_now.css('width','0px');
                box_num_now.css('height','0px');
                box_num_now.css('top',20+i*120 + 50 );
                box_num_now.css('left',20+j*120 + 50 );
            }
            else{
                box_num_now.css('width','100px');
                box_num_now.css('height','100px');
                box_num_now.css('top',20+i*120);
                box_num_now.css('left',20+j*120);
                box_num_now.css('background-color',getNumberBackgroundColor( board[i][j] ) );
                box_num_now.css('color',getNumberColor( board[i][j] ) );
                box_num_now.text( board[i][j] );
            }
        }
}
function GetOneNumber(){

    if( nospace( board ) )
        return false;

    //随机一个位置
    var x = Math.floor( Math.random()  * 4 ) ;
    var y = Math.floor( Math.random()  * 4 ) ;
    while(1){
        if( board[x][y] == 0 )
            break;
        x = Math.floor( Math.random()  * 4 ) ;
        y = Math.floor( Math.random()  * 4 ) ;
    }
    //随机一个数字
    var num = Math.random() < 0.5 ? 2 : 4;
    //在随机位置显示随机数字
    board[x][y] = num;
    showNumberWithAnimation( x , y , num );
    return true;
}
$(document).keydown( function( event ){
	var optionsleft=$("#setleft option:selected");
	infoleft=optionsleft.val();
	var optionsup=$("#setup option:selected");
	infoup=optionsup.val();
	var optionsright=$("#setright option:selected");
	inforight=optionsright.val();
	var optionsdown=$("#setdown option:selected");
    infodown=optionsdown.val();
	var info = event.keyCode;
	if(info==infoleft)
		deal=0;
	else if(info==infoup)
		deal=1;
	else if(info==inforight)
		deal=2;
	else if(info==infodown)
		deal=3;
	else deal=-1;
    switch( deal ){
        case 0: //left
            if( moveLeft() ){
                setTimeout("GetOneNumber()",210);
                setTimeout("isgameover()",300);
            }
			updateMaxnum(maxnum,board);
            break;
        case 1: //up
            if( moveUp() ){
                setTimeout("GetOneNumber()",210);
                setTimeout("isgameover()",300);
            }
			updateMaxnum(maxnum,board);
            break;
        case 2: //right
            if( moveRight() ){
                setTimeout("GetOneNumber()",210);
                setTimeout("isgameover()",300);
            }
			updateMaxnum(maxnum,board);
            break;
        case 3: //down
            if( moveDown() ){
                setTimeout("GetOneNumber()",210);
                setTimeout("isgameover()",300);
            }
			updateMaxnum(maxnum,board);
            break;
        default: //default
            break;
    }
});
function moveRight() {
    for(var i=0;i<4;i++){
        for (var m = 0; m < 3; m++) {
            for(var j=3;j>0;j--)
            {
                if (board[i][j] == 0 && board[i][j - 1] != 0) {
                    board[i][j] = board[i][j - 1];
                    board[i][j - 1] = 0;
                    showMoveAnimation(i, j - 1, i, j);
                }
            }
        }
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 3; j > 0; j--) {
            if(board[i][j]!=0&&(board[i][j]==board[i][j-1]))
            {
                board[i][j] *= 2;
                board[i][j - 1] = 0;
                score += board[i][j];
                showMoveAnimation(i, j- 1, i, j);
            }
        }
    }
    for (var i = 0; i < 4; i++) {
        for (var m = 0; m < 3; m++) {
            for (var j = 3; j > 0; j--) {
                if (board[i][j] == 0 && board[i][j - 1] != 0) {
                    board[i][j] = board[i][j - 1];
                    board[i][j - 1] = 0;
                    showMoveAnimation(i, j - 1, i, j);
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200); 
    return true;
}
function moveLeft() {
    for (var i = 0; i < 4; i++)
        for (m = 0; m < 3;m++)
        for(var j=0;j<3;j++)
        {  
            if(board[i][j]==0&&board[i][j+1]!=0)
            {
                board[i][j] = board[i][j + 1];
                board[i][j + 1] = 0;
                showMoveAnimation(i, j+1, i, j);
            }
        }
    for(var i=0;i<4;i++)
        for (var j = 0; j < 3; j++)
        {
            if(board[i][j]!=0&&board[i][j]==board[i][j+1])
            {  
                board[i][j] *= 2;
                board[i][j + 1] = 0;
                score += board[i][j];
                showMoveAnimation(i, j + 1, i, j);
            }
        }
    for (var i = 0; i < 4; i++)
        for (m = 0; m < 3; m++)
            for (var j = 0; j < 3; j++) {
                if (board[i][j] == 0 && board[i][j + 1] != 0) {
                    board[i][j] = board[i][j + 1];
                    board[i][j + 1] = 0;
                    showMoveAnimation(i, j + 1, i, j);
                }
            }
    setTimeout("updateBoardView()", 200);
    return true;
}
function moveDown() {
    for (var i = 0; i < 4; i++)
        for (m = 0; m < 3; m++)
            for (var j = 3; j > 0; j--) {
                if (board[j][i] == 0 && board[j-1][i] != 0) {
                    board[j][i] = board[j-1][i];
                    board[j-1][i] = 0;
                    showMoveAnimation(j - 1, i, j, i);
                }
            }
    for (var i = 0; i < 4; i++)
        for (var j = 3; j > 0; j--) {
            if (board[j][i] != 0 && board[j][i] == board[j-1][i]) {
                board[j][i] *= 2;
                board[j-1][i] = 0;
                score += board[j][i];
                showMoveAnimation(j - 1, i, j, i);
            }
        }
    for (var i = 0; i < 4; i++)
        for (m = 0; m < 2; m++)
            for (var j = 3; j > 0; j--) {
                if (board[j][i] == 0 && board[j-1][i] != 0) {
                    board[j][i] = board[j-1][i];
                    board[j-1][i] = 0;
                    showMoveAnimation(j - 1, i, j, i);
                }
            }
    setTimeout("updateBoardView()", 200);
    return true;
}
function moveUp() {
    for (var i = 0; i < 4; i++)
        for (m = 0; m < 3; m++)
            for (var j = 0;j<3; j++) {
                if (board[j][i] == 0 && board[j+1][i] != 0) {
                    board[j][i] = board[j+1][i];
                    board[j+1][i] = 0;
                    showMoveAnimation(j + 1, i, j, i);
                }
            }
    for (var i = 0; i < 4; i++)
        for (var j = 0; j <3; j++) {
            if (board[j][i] != 0 && board[j][i] == board[j+1][i]) {
                board[j][i] *= 2;
                board[j+1][i] = 0;
                score += board[j][i];
                showMoveAnimation(j + 1, i, j, i);
            }
        }
    for (var i = 0; i < 4; i++)
        for (m = 0; m < 2; m++)
            for (var j = 0; j < 3; j++) {
                if (board[j][i] == 0 && board[j + 1][i] != 0) {
                    board[j][i] = board[j + 1][i];
                    board[j + 1][i] = 0;
                    showMoveAnimation(j + 1, i, j, i);
                }
            }
    setTimeout("updateBoardView()", 200);
    return true;
}
function isgameover() {
    if (gameover(board))
        alert("gameover!");
    if (maxnum >= 2048)
        alert("you have won the game!");
}
function gameover(board) {

    for (var i = 0 ; i < 4 ; i++)
        for (var j = 0 ; j < 4 ; j++) 
            if (board[i][j] == 0)
                return false;
    for (var i = 0 ; i < 4 ; i++)
        for (var j = 0 ; j < 4 ; j++)
            if (board[i - 1][j] == board[i][j] || board[i + 1][j] == board[i][j] || board[i][j + 1] == board[i][j] || board[i][j - 1] == board[i][j])
                return false;
        
    return true;
}
function showNumberWithAnimation( i , j , num ){

    var numberCell = $('#box_num-' + i + "-" + j );

    numberCell.css('background-color',getNumberBackgroundColor( num ) );
    numberCell.css('color',getNumberColor( num ) );
    numberCell.text( num );

    numberCell.animate({
        width:"100px",
        height:"100px",
        top: 20 + i * 120,
        left: 20 + j * 120
    },50);
}
function showMoveAnimation( fromx , fromy , tox, toy ){

    var numberCell = $('#box_num-' + fromx + '-' + fromy );
    numberCell.animate({
        top:20+tox*120,
        left:20+toy*120
    },200);
}
function updateScore( score ){
    $('#score').text( score );
}
function updateMaxnum(maxnum,board){
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++)
			maxnum=maxnum>board[i][j]?maxnum:board[i][j];
	$('#maxnum').text(maxnum);
}
function getNumberBackgroundColor( number ){
    switch( number ){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
    }

    return "black";
}
function getNumberColor( number ){
    if( number <= 4 )
        return "#776e65";

    return "white";
}
function nospace( board ){

    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ )
            if( board[i][j] == 0 )
                return false;

    return true;
}
