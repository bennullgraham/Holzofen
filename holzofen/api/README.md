
Sections
==========

Metadata section
----------

**Date** *[optional]*

Optional date indicating the absolute time the first reading was made. If not supplied, the current time will be used.

Format: `Date: <year> <month> <day> <hour> <minute> <second>` e.g.: `Date: 2012 1 4 12 13 01`

**Fields** *[required]*

A list of titles for the columns of data being uploaded. The comma is the only reserved character, which separates the fields.

Format: `Fields: <fieldname>, [fieldname, [...]]` e.g.: `Fields: Oven Temperature, Brick Temperature`

Separator Section
----------
`<single blank line>`

Data section
----------

An arbitrary but constant number of columns of data until EOF. Columns should be separated by a single tab character (ASCII 9 or "`\t`")

  - First column: time offset since first reading, in seconds
  - Second to *n*th col: Floats of any accuracy. Numbers without decimal parts should still contain trailing zeros.

Example
==========
    Date: 2012 09 06 19 46 34
    Fields: Brick Temperature, Oven Temperature, Chimney Temperature
    
    0	20.0	40.0	31.3
    15	22.1	45.8	40.8
    30	24.4	53.1	49.7
