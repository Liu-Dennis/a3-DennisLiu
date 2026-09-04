## Basic Online Homework Tracker
Similar to a to-do list, you are able to input a task (an assignment) as well as any other associated information
such as the coresponding subject and/or due date. The server then calculates an urgency level for any specific assignment
given that a due date is provided. If no due date is supplied, it simply ommits adding a urgency level.

## Technical Achievements
- **Single page application**: Website is able to keep in 2 way communication with server and keeps the user-side list
up to date with the server side content on any addition or update to the list. 

- **Data modification**: In addition to being able to delete entries, modifications can be made to any existing entry in
the the list. Simply click the edit button and you are able to make modifications to the current entry by accessing the 
edit modal.

- **Base Requirements**: Utilized HTML forms inorder to submit data to the backend. Single page website validates.
CSS flexbox used for centering main div in addition to arranging out the navigation bar's links. CSS uses all three
element, id and class selectors for theming. Javascript is used for communication for two ways.

### Design/Evaluation Achievements
- **Website Theming**: Themed website with blurred panel, background. While relatively straightfoward to implement,
it took a handful of itterations of CSS filter settings, different backgrounds and different image formats before 
settling with the current version due to readability issues and load times. Most combinations of background and blur 
either made text very difficult to read. This was also complicated by the fact that only one CSS effect can be active 
at once for an element. There was also some experimentation with CSS animations for the table in order to help soften
items appearing.
