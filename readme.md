# Bigfoot Bib Report Winlink Form

## Overview
Destination Trail holds their "Bigfoot 200" ultra trail running marathon event in Washington State every summer. The event spans the Gifford Pinchot National Forest and the Mt.St.Helens Volcanic Monument. Participants are tracked as they arrive, and depart (or drop) at one of the many remote aid station sites along the route. Hams volunteer their time and equipment to report the bib numbers of participants at each Aid Station. In the past this was done by voice via simplex and a repeater network. More recently, Winlink has become the preferred method to transfer these 'bib reports' to race coordinators via the ham network more rapidly, freeing the simplex and repeater channels for other traffic. Race HQ receives these Winlink "bib reports" and enter them into a database for reporting on bib location and status to Race Management (not for official timing though).

## Form and Template Version
This version of the form was built from a prior version using these files:
- "Race Tracker Initial.html" aka The Form. This is a single-page website built with html, javascript, and css.
- "Race Tracker.txt" aka The Template. A plain-text file with special keywords elements to receive data produced by the Form.

For more information about Destination Trail and their ultra trail running marathons, see [Bigfoot200.com](https://www.bigfoot200.com/) and [DestinationTrailRun.com](https://www.destinationtrailrun.com/).

For more information about Winlink Express and the Winlink system see [Winlink.org](https://www.winlink.org).

## How Winlink Forms Work
There are two components to a Form:
- Winlink Template (a text file)
- Winlink Form (an html file)

The plaintext Winlink Template describes how data is placed within an open Winlink Message. 

The Winlink Form is a single-page website that prompts the user for the necessary data and packages it up for the operator.

When done entering data, the Winlink operator clicks the Submit button on the Form, which transfers the form data to a new Winlink Message window. The Template file standardizes the data that was input into an expected, formal format. The recipient of the message will get the same data formatting and layout with each message, every time. This simplifies processing the data by the recipient(s).

## How This Form Is Used
Aid Station volunteers should have a notebook of all the possible bib numbers that are registered for the race. As runners enter and leave each Aid Station (or drop from the event), their bib information is updated in that notebook. Hams take note of each bib number in/out/drop times, including the date, and enter that into this form. The form is then submitted as a New Winlink Message and posted to the Winlink Outbox. It is up to the Winlink operator to select an appropriate amateur channel and mode to transfer that runner data to event headquarters. Usual methods include simplex VHF (Packet or VARA FM), or HF (ARDOP or VARA HF). Peer-to-Peer or relay via remote RMS stations are utilized.

## How to Install This Form and Template
After downloading the Template and Form files, copy them to your Winlink Express installation folder in the {callsign}\Templates folder. You can create a new folder within Templates if you wish. In Winlink Express, use the Messages menu and select "Set Favorite Templates". Supply a display name (suggest "Bigfoot"), and update the filename to Bigfoot Bib Report Initial.html. Whenever you create a new message, a new button will be along the top of the New Message window (i.e. "Bigfoot"). Click it to start entering data into the Form.

For detailed instructions on the use of Winlink Forms and Templates see [Winlink.org](https://www.winlink.org).

## Form Usage in Winlink Express
Open and prepare the form:
1. Open a new message and then click Select Template.
2. Drill down into the Templates Tree to find this Form, select it with the mouse, then click the Select menu item. The form opens in a new browser tab (or window).
3. Enter information into the top section of the form. This information will stick with the form until you submit it:
  - Event Title
  - Message Number
  - Callsign(s) to send the message to
  - Your Location (select an Aid Station Name from the drop-down list)
4. Message Subject will get auto filled for you based on the entries above

Add a record for each runner that arrives, departs, or drops from the race:
1. Enter the runner bib number.
2. Click the time field (you can override it).
  - If the entry is for the previous day, click the checkbox so the entry will be back-dated one day.
3. Click one of the buttons: IN, OUT, or DROP.

The Number of Entries field should have an accurrate count of entries. Recommend you keep the number below 20 so if for any reason data is lost (for example, power loss or application crash) it will not take too long to re-enter the data.

4. Add free-form comments in the Comments textbox but do not include time-sensitive information! Use another mode of communication for anything beyond what is directly related to this runner data.
5. Ignore the buttons related to UltraLive - Bigfoot Hams do not use this feature at this time although it could be implemented in the future.
6. Click Submit and close the popup message and then close the browser tab.

### Clear Entries button
Removes rider entries from the lower half of the form.

### Save/Load Race Data
Use these buttons to save header information so you do not have to re-enter it in the future.

## Development
This project utilizes HTML, Javascript, CSS, and plaintext. There are no specific build requirements. It is helpful to have an operable and up-to-date version of Winlink Express installed on (or near) your development machine.

## Branching and Pull Requests
This repository uses a Root branching pattern. Any new or patch commits will have to be based on Main and ready to merge back into Main without merge conflicts. A Pull Request should have helpful comments as to what it contains, as well as have a link to an associated GitHub Issue.

## Participating In Development
Wanted: Your help and input! Contact K7RMZ at ARRL dot NET with your message, and put the name of this repository in the subject line.