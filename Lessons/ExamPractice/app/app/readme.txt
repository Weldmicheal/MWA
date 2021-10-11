Guidelines
1. My database name and collection is the same as the dump database
2. The homepage is on locoalhost:/3000/#!/
3. Goto locoalhost:/3000/#!/jobs page and we get the search form and list of jobs; each
    list contains a details link and delete button
4. Click details and it will take us to a new page displaying all the details of the job.
    There is a backtohome anchor; clicking that will take us back to the home page
5. Once the deleteJob button is clicked it will automatically delete the job unless there is
  an internal server error. So, before hitting the delete button make sure to delete that
   Once the job is deleted it disappears from the list and the page is refreshed and we will get
   all list of jobs but the deleted once. 
6. To search for the nearby location, a form is provided to insert the 
  coordinates (longitude, latitude, and distance). I made proper hardening.So, unless all the right
   parameters are inserted, it won't let us search rather it will pop up error. 
   When we insert all coordinates correctly the list of nearby locations will be displayed.
   Similarly, we can see the details and delete.
    
7. There is dropdown menu below the table which enables us to choose how many jobs to
  display per a single page. 
8. I have applied a pagination, so only a limited number of lists are displayed per request.
there are previous and next buttons that allow us to see the previous and next jobs, respectively.

9. Finally, I have used bootstrap and custom styling to decorate my page.
  














  