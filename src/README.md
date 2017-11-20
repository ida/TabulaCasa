Develop
=======


Files structure
---------------

Directories informally structure the app, by components.

Where component stands as a term for sub-elements which should be handled in
an isolated way and could be moved around the doc without problems.

Everything starts with the 'main.js' in the uppest directory, of there the
functions of subdirectories are initialized, which again should live in a
'main.js' of the subdirectory.


Styles
------

For styling, each directory should have its own 'style.js', same approach here
as with main.js-files: initialize functions from the 'style.js' directory above.

Use this to add styles: `styletoSheet.addRule(selector, style)`.
It will ensure styles are prefixed with the app-name as a class and avoid
human-notation-errors and -inconsistencies.

We also need this seperation, so we can omit all 'style.js'-files when finalizing
the app (see below).



Finalize
========

Whenever we want to release a version, here's what needs to be done.


Styles
------

Of within any script export the dynamically generated stylesheet, like this:

    styletoSheet.downloadStyles()

Then reload browser and save the file.


Javascripts
-----------

Merge scripts:

    python merge.py appName


TODO: Describe further steps.



Otherwise
---------

Don't hesitate to open an issue, if you have questions.
