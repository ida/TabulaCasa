TabulaCasa
==========

Spreadsheets in a browser with a focus on keyboard-input.


What
====

1.) All user-interactions are possible using the keyboard only,
as a by-product one can also use the mouse but that's not the
emphasis, here.

2.) Any changement will be stored immediately.


Why
===

1.) It's so much faster and it's vital for peeps who depend on 
keyboard-accessibility, e.g. if you have pain in your hands any
saved huge movement makes a difference.

2.) When you work in offline-mode, or accidentally close the browser,
or whatever unforeseeable obstacles can come around, the data won't
be lost: When opening the page again, everything's still there.

3.) For fun.


How
===

Technically
-----------

The data is saved in the browser's local-storage.

Currently each table takes up a key for its id and stores
the table-data as a CSV-string in the value. This is suppossed
to change to one (most possible unique) key, holding all
of the app's data (also user-config-settings) in JSON-format.


Usage
-----

For a standalone-app clone this repo:

    git clone https://github.com/ida/TabulaCasa.git

Or download the files 'index.html' and 'TabulaCasa.js'.

Then open the file 'index.html' in your browser.


To insert this app into an arbitrary element of your website,
embed the script 'TtabulaCasa.js' in the head-ele of your site and
initiate it in one of your Javascripts, upon an element:

    TabulaCasa(theEleYouPass)


Development
===========

If you like to contribute, please file an issue in the bug-tracker.

Newbies and peeps from so called marginalized groups are especially welcome.

Development happens in the 'src'-directory of this repository, it contains
a README also with further explanations.


Authors
=======

Ida Ebkes <contact@ida-ebkes.eu>


License
=======

MIT License, a copy is attached in this folder.


Last touched
============
This README was last updated by a human on 14th November 2017.
