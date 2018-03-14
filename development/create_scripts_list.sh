# Execute this file from the commandline like this:
#
#     . create_ordered_scripts_list.sh
#
# You'll get a file named 'scripts.txt' that lists all found
# Javascript-files of the current directory, sorted by file-name
# in reversed alphabetical order.
#
# Optionally specify another directory to search through, than the
# current one, by appending its path as an additioinal argument:
#
#     . create_ordered_scripts_list.sh path/to/another/directory
#
# If a file named 'scripts.txt' already exists, the search-results
# are appended to the existing file's content.
# That allows to accumulate found files of different directories.

pathToSearch='.'; if [[ "$1" != "" ]]; then pathToSearch=$1; fi;
find $pathToSearch -type f -name "*.js" | sort >> scripts.txt
