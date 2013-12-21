var http = require('http');

var program = require( 'commander' );

program
    .version( '0.0.1' )
    .option( '-p, --port [port number]', 'Port to listen on. Default: 8000', 8000 )
    .option( '-r, --response [response code]', 'Response code to send. Default: 200', 200 )
    .option( '-c, --content [response content]', 'Content of the response to send back. Default: ok', 'ok' )
    .option( '-t, --type [response content type]', 'Content-Type of the response. Default: text/plain', 'text/plain' )
    .parse( process.argv );

var server = http.createServer( function( request, response ) {
    var body = '';
    request.on( 'data', function( chunk ) {
        body += chunk;
    } );

    request.on( 'end', function() {
        console.log( new Date() );
        console.log( '  url: ' + request.url );
        console.log( '  method: ' + request.method );

        console.log( '  headers:' );
        console.log( '' );
        for ( var header in request.headers ) {
            console.log ( '    ' + header + ': ' + request.headers[ header ] );
        }
        console.log( '' );

        console.log( '  body:' );
        console.log( '' );
        console.log( body );
        console.log( '' );

        response.writeHead( program.response, {
            "Content-Type": program.type
        } );
        response.end( program.content );
    } );

});

server.listen( program.port );
console.log( 'Listening on port ' + program.port );
