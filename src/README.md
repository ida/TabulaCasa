Approach
========

Files structure
---------------

Everything starts with 'main.js' in this directory, of there the functions of
subdirectories are initialized, each subdirectory should contain a main.js,
too, and follow that approach furtheron.

Styles are currently generated of within Javascripts named 'style.js' and are
inserted into a style-ele in the head-ele of the doc. They are ment to be
copied and pasted later on into a static stylesheet, which isn't realized, yet.
Every directory should have it's own 'style.js' and from there call style-funcs
of subdirectories.


Avoid naming conflicts
----------------------

For finalizing a version of this app, there is the Python-script 'merge.py', it
willl merge all js-scripts into one file and wrap all of it into one function
called 'TabulaCasa', so only this name needs to be unique within the document.
Style-selectors should use the prefix '.TabulaCasa ', so it will not affect
other eles in the document.


Otherwise
---------

Don't hesitate to open an issue, if you have questions.
