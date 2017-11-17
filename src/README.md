Files structure
---------------

A directory should always contain a 'main' and a 'style'-js-file and
represents an ele in the app, that also has a known class-name, e.g.
to access it quickly with:

    getComponentEle(getAppEle(), componentClassName)


Styling
-------

In the style-files use this function:

    addStyles(selector, style)


Any applied style will be prefixed with the app's class-name, e.g.:

    addStyle('div', 'background: red; color: blue;')


Produces this rule:

    .appName div {
        background: red;
        color: blue;
    }


And inserts it to the app's style-element in the header.



Finalizing
----------


For finalizing a version of this app, there is the Python-script 'merge.py', it
willl merge all js-scripts into one file and wrap all of it into one function,
so only this function-name needs to be unique within the document.

Use it like this, replace 'appName' with the app's name:

    python merge.py appName


TODO: Export styles of style-ele and include them as css-file.



Otherwise
---------

Don't hesitate to open an issue, if you have questions.
