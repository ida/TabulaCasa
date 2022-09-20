TabulaCasa
==========

Spreadsheets in a browser with a focus on keyboard-input.


What
====

1.) All user-interactions are possible using the keyboard only,
as a by-product one can also use the mouse, but that's not the
emphasis, here.

2.) Any changement will be stored immediately, while typing.


Why
===

1.) It's so much faster and it's vital for peeps who depend on 
keyboard-accessibility, e.g. if you have pain in your hands any
saved huge movement makes a difference.

2.) When you work in offline-mode, or accidentally close the browser,
or whatever unforeseeable obstacles can come around, the data won't
be lost: When opening the page again, everything's still there.



How
===


Usage
-----


Download './production/TabulaCasa.js' and insert it into
the head-element:

    <script src="TabulaCasa.js"></script>


Then initiate the app:

    <script>
        TabulaCasa()
    </script>


This will use the body-element as the app-ele, you can optionally
pass another element:

    <script>
        TabulaCasa(anotherElement)
    </script>



Technically
-----------

The data is saved in the browser's local-storage.

Currently each table takes up a key for its id and stores
the table-data as a CSV-string in the value. This is supposed
to change to one (most possible unique) key, holding all
of the app's data (also user-config-settings) in JSON-format.


Development
===========

Read './development/README.txt'


Bugs'n'hugs
===========


Found a bug, have constructive criticism, wanna rant along or give snarky comments?

Tell me on github about it: https://github.com/ida/TabulaCasa/issues/new

Or send an email and cross fingers, it gets through my spam-filters.



Author
======

Ida Ebkes, 2016.



License
=======

MIT License, a copy is attached in this folder.



Last touched
============

This README was last updated by a human on the 15th of August, 2022.

