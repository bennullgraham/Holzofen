API
###

Importing Existing Data
***********************

By uploading a file to the site, an existing firing can be imported and made available for viewing.

File Format
===========

Metadata section
----------------

**Date** *[optional]*
  Optional date indicating the absolute time the first reading was made. If not supplied, the current time will be used. Each value should be separated by a single space character. It looks like::

    Date: <year> <month> <day> <hour> <minute> <second>

  e.g.::

    Date: 2012 1 4 12 13 1

  Values may be zero-padded or not.

**Fields** *[required]*
  A list of titles for the columns of data being uploaded. The comma is the only reserved character, which separates the fields. Fields are whitespace-trimmed but otherwise left untouched. Format::
  
    Fields: <fieldname>, [fieldname, [...]]

  e.g.::

    Fields: Oven Temperature, Brick Temperature

Separator Section
-----------------

There should be a single blank line (it may contain whitespace) between the Metadata and Data sections.

Data section
------------

An arbitrary but constant number of columns of data. These repeat row by row until EOF. Columns should be separated by a single tab character (ASCII 9 or "``\t``"). Row format is::

  offset	temp-1	temp-2	[...]	temp-N

e.g.::

  600	143.8	212.0

Column-Specific Formatting
^^^^^^^^^^^^^^^^^^^^^^^^^^

===================== ============================================
First Column          Time offset since first reading, in seconds.
                      Plain integer value.
Second to *n*-th col  Floats of any accuracy. Numbers without 
                      decimal parts should still contain trailing 
                      zeros.
===================== ============================================

Example
-------

::

  Date: 2012 09 06 19 46 34
  Fields: Brick Temperature, Oven Temperature, Chimney Temperature

  0	20.0	40.0	31.3
  15	22.1	45.8	40.8
  30	24.4	53.1	49.7

Live Firings
************

Submitting live data is a two step process. First, you must inform the server that a firing is beginning. It will respond with a unique identifier. Then, arbitrary temperature readings can be submitted at any time. The identifier is used to associate the reading with the correct firing.

Get Unique Identifier
=====================

Send a HTTP POST request to ``http://holzofen.bgraham.com.au/api/1.0/firings/``. The HTTP request body should be empty. 

Example Requests
-----------------
  **Telnet**

  ``telnet`` can be used to sanity-check that you can ask for a new firing and receive a unique ID, without using a programming language, libraries, etc. Output from telnet (including responses from the server) are shown as comments. Input is shown as regular text. 

  .. attention::
    The server will give up listening before you can type all of the below; try pasting the input.

  .. code-block:: bash
    
    $ telnet holzofen.bgraham.com.au 80
    # Trying 176.34.29.250...
    # Connected to holzofen.bgraham.com.au.
    # Escape character is '^]'.
    POST /api/1.0/firings/ HTTP/1.1
    Host: holzofen.bgraham.com.au
    
    # HTTP/1.0 200 OK
    # Content-Type: application/json
    # Content-Length: 26
    # Server: Werkzeug/0.8.3 Python/2.7.3
    # Date: Tue, 11 Sep 2012 10:44:51 GMT
    
    # "504f1623f175e01596b7c718"

  Note the blank line after ``POST ...``, which indicates the end of the request's header section. Hitting enter on this blank line causes the server to respond. It returns a header section with metadata, a blank line, and then, in the data section, the unique identifier. Note that the quotation marks wrapping the identifier are not part of the identifier.

  **Arduino**

  The following code comes from an `Arduino HTTP example <http://snipplr.com/view/57138/http-post-from-arduino-wifly-library/>`_ and demonstrates constructing a POST request:

  .. code-block:: c

    client.println("POST /api/1.0/firings/ HTTP/1.1");
    client.println("Host: holzofen.bgraham.com.au");
    client.println("Content-Type: text/plain");
    client.println("User-Agent: Dad/1.0");
    client.println("Connection: close");
    client.println("Content-Length: 0");
    client.println(""); // this empty line terminates the HTTP header

  Then retrieve the identifier:

  .. code-block:: c

    delay(2000); // wait for the internet
    while (client.available()) {
        char c = client.read();
        // ...
    }

  The response is in the same format as the request: a metadata section and a data section, separated by a blank line. You will need logic to read in and discard the metadata, though checking that the first line contains "200 OK" is a good idea.

Submit Temperature Reading
==========================

Send a HTTP PUT to ``http://holzofen.bgraham.com.au/api/1.0/firings/<identifier>/?mode=append``.

Example Requests
----------------

  **Telnet**

  .. attention::
    The server will give up listening before you can type all of the below; try pasting the input. Also, note the ``Content-Length: ...`` header must reflect the length of data actually sent in the request body.

  .. code-block:: bash

    $ telnet holzofen.bgraham.com.au 80
    # Trying 176.34.29.250...
    # Connected to holzofen.bgraham.com.au.
    # Escape character is '^]'.
    PUT /api/1.0/firings/504f1623f175e01596b7c718?mode=append HTTP/1.1
    Host: holzofen.bgraham.com.au
    Content-Length: 56
    Content-Type: application/x-www-form-urlencoded

    offset=30&Oven+Temperature=223.4&Brick+Temperature=32.33
    # HTTP/1.0 200 OK
    # Content-Type: application/json
    # Content-Length: 26
    # Server: Werkzeug/0.8.3 Python/2.7.3
    # Date: Tue, 11 Sep 2012 12:41:09 GMT

    # "504f1623f175e01596b7c718"

  The firing ``504f1623f17...`` has now been updated.

  **Arduino**

  .. code-block:: c

    String data = "offset=0&Oven+Temperature=123.4&Brick+Temperature=12.3
    client.println("PUT /api/1.0/firings/504833d8dcaa9f7754dc5281/?mode=append")
    client.println("Host: holzofen.bgraham.com.au");
    client.print("Content-Length: ");
    client.println(data.length());
    client.println("Content-Type: application/x-www-form-urlencoded");
    client.println("")
    client.println(data)

  The server will respond with a `200 OK <http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1>`_ and a response body containing the unique identifier if the identifier was understood, or a 404 Not Found otherwise. 

  .. note::
    If the identifier points to a firing which hasn't received a new temperature in more than a day, it will be rejected.

  The first temperature set submitted defines how many temperatures this firing record has. For example, if the first PUT contains two temperatures, every subsequent PUT must also contain two, and they must have the same labels ("Oven Temperature" etc).

Form Data Encoding
==================

Form data is formatted as a series of `key=value` statements separated by ampersands, e.g.::
  
  key1=value&key2=value&key3=value...

Alphanumeric characters are safe, but spaces (!) and other characters need to be encoded according to ``application/x-www-form-urlencoded`` rules. If only alphanumerics and spaces are being used, simply replace spaces with ``+`` and don't worry about it. E.g.::

  offset=0&Oven+Temperature=123.4&Brick+Temperature=12.3

encodes the information::

  offset: 0
  Oven Temperature: 123.4
  Brick Temperature: 12.3

Finishing a Firing
==================

Just stop sending new temperatures. Any firing which hasn't received a new temperature in 30 minutes won't be treated as live any more.