jQuery Thead
============

The jQuery Thead plugin simplifies the navigation in tables that have lots of rows and 
require scrolling. It enforces the visibility of the table header and ensures that the 
column names are always accessible for the user.

Usage 
-----

The plugin is automatically activated for every table that uses the "jquery-thead" class:

    <table class="jquery-thead" />
    
The same class can also be used with a DIV wrapper in cases when tables that should be 
dynamically replaced:

    <div class="jquery-thead">
        <table />
    </div>

The plugin can be applied with JavaScript using the following:

    $('sample3').thead();
