# Bigfoot Bib Report Winlink Form

## Overview

Destination Trail holds their "Bigfoot 200" ultra trail running marathon event in Washington State every summer. The event spans the Gifford Pinchot National Forest and the Mt.St.Helens Volcanic Monument.

Participants are tracked as they arrive, depart, or drop out of the race, at each one of the many remote aid station sites along the route.

Hams volunteer their time and equipment to report the bib numbers of participants at each Aid Station. In the past this was done by voice via simplex and a repeater network. More recently, Winlink has become the preferred method to transfer these 'bib reports' to race coordinators via the ham network more rapidly, freeing the simplex and repeater channels for other traffic.

Race HQ receives these Winlink "bib reports" and enter them into a database for reporting on bib location and status to Race Management (not for official timing though).

This form aims to standardize the data "Race HQ" receives via these reports, for rapid entry, download, and reporting.

For more information about Destination Trail and their ultra trail running marathons, see [Bigfoot200.com](https://www.bigfoot200.com/) and [DestinationTrailRun.com](https://www.destinationtrailrun.com/).

## Form and Template Version

This version of the form was built from a prior version using these files:

- "Race Tracker Initial.html" aka The Form. This is a single-page website built with html, javascript, and css.
- "Race Tracker.txt" aka The Template. A plain-text file with special keywords elements to receive data produced by the Form.

For more information about Winlink Express and the Winlink system see [Winlink.org](https://www.winlink.org).

## How Winlink Forms Work

There are two components to a Form:

- Winlink Template (a text file)
- Winlink Form (an html file)

The plain text Winlink Template describes how data is placed within an open Winlink Message.

The Winlink Form is a single-page website that prompts the user for the necessary data.

When done entering data, the Winlink operator clicks the Submit button on the Form, which transfers the form data to a new Winlink Message window.

The Template file arranges the inputted data via the Form, into an expected, formal format.

The recipient of the message will get the same data formatting and layout with each message, every time. This simplifies processing the data by any recipients.

## How Bib Data Is Recorded At Aid Stations

Aid Station volunteers should have a notebook of all the possible bib numbers that are registered for the race. As runners enter and leave each Aid Station (or drop from the event), their bib information is updated in that notebook. Hams take note of each bib number in/out/drop times, including the date, and enter that into this form. The form is then submitted as a New Winlink Message and posted to the Winlink Outbox.

## How to Install This Form and Template

1. Download the Template and Form files.
1. Copy them to your Winlink Express installation folder in the {callsign}\Templates folder.
1. Optional: Create a new folder within the Templates directory if you wish.
1. Open In Winlink Express.
1. Click the Messages menu and select "Set Favorite Templates".
1. Supply a display name (suggest "Bigfoot" or similar), and update the filename to Bigfoot Bib Report Initial.html.

Now, whenever you create a new message, a new button will be along the top of the New Message window (as you named it, above). Click it to launch the Form so you can start inputting data.

For detailed instructions on the installation of Winlink Forms and Templates see [Winlink.org](https://www.winlink.org).

## Form Usage in Winlink Express

*Note*: It is up to the Winlink operator to select an appropriate amateur channel and mode to transfer that runner data to event headquarters. Usual methods include simplex VHF (Packet or VARA FM), or HF (ARDOP or VARA HF). Peer-to-Peer or relay via remote RMS stations are utilized.

Overall these steps are necessary:

1. Open and prepare the form.
1. Enter bib data into the form.
1. Decide when to store or load existing race data.
1. Submit the Form and post the message to the Outbox.

### Open The Form

1. Open a new message and then click Select Template.
1. Drill down into the Templates Tree to find this Form and select it with the mouse.
1. Click the Select menu item. The form opens in a new browser tab (or window).

### Prepare Common Form Data

Enter information into the top section of the form. What you enter here will update the *subject line* of the message, and will "stick" with the form until you submit it.

*Note*: Many browsers will store previously entered data into fields. It is not a feature of the Form. You might (or might not) want your browser to do this.

1. Enter an Event Title.
1. Update the Message Number (start with 1, please).
1. Add Callsign(s) of the recipients you want to send the completed message to.
1. Select your Location (all current Aid Station Names, start, and finish are all in the drop-down list).

*Note*: The Subject will get automatically updated. *Review it to be sure it is accurrate* before continuing.

### Store And Load Existing Race Data

*Note*: This functionality will help you store all of the "top" form fields (and therefore the subject line) as well as any entered bib data.

1. Complete the top section of the form.
1. Click the SAVE RACE DATA button.
1. A pop-up will appear with a filename.
1. Rename the file something that represents your aid station such as "Chain of Lakes WL Form Header.txt".
1. Click OK and the file will get stored in your "Downloads" directory.

*Note*: If you enter bib data, that will get saved too!

Load Existing Race Data:

1. Open the Form.
1. Click the Load Race Data button and a Windows Explorer view will appear. If you are lucky it will point to your *Downloads* directory.
1. Select the ".txt" file you want to load data from. For example "Chain of Lakes WL Form Header.txt" to pre-load your form and get to entering data!
1. Continue entering bib data into the form and either Store the data again to an existing or new ".txt" file, or [Submit](#submit-completed-form-and-post-message-to-outbox) the data when done.

### Enter Bib Data Into The Form

1. Tap or click the empty box next to "Bib or Rider".
1. Enter the bib number. For example `101`.
1. Press Tab to move to the "Time" entry box (or tap or click on it to select it) and the current 24-hour time will appear in the box for the *current day*.
1. *As necessary* update the time to an accurrate representation of the time the runner arrived, left, or dropped. Does *not* have to be exact, just close.
1. *Optional*: Tap or Click the checkbox to tell the Form the time references *yesterday*. If the checkbox is highlighted you can press the space bar on your keyboard to check or un-check it.
1. *Choose one*: IN, OUT, DROP. Depending on what the event was.

The correctly formatted bib data will appear in the window below and the "Number of entries" count will increase by 1.

*Important*: All bib data inside the entries window will disappear without chance for recovery if you click the Clear Entries button. The only way to recover entries is to have already used the [Store and Load Existing Race Data](#store-and-load-existing-race-data) operation listed above.

### Submit Completed Form And Post Message To Outbox

1. Check that the Number of Entries number contains an accurrate count of entries. Recommend you keep the number below 20 so if for any reason data is lost (for example, power loss or application crash) it will not take too long to re-enter it.
1. Add any free-form comments in the Comments box near the bottom of the form. *Do not include time-sensitive information!* Use another mode of communication for time-sensitive communications.
1. Click Submit.
1. The browser will tell you to close it (at least close the current tab).
1. Winlink Express should now show you a fully-populated message. Click "Post Message to Outbox" and follow appropriate procedures for transmitting the message at an appropriate time.

## Development

This project utilizes HTML, Javascript, CSS, and plaintext. There are no specific build requirements. It is helpful to have an operable and up-to-date version of Winlink Express installed on (or near) your development machine.

This form should support the "top ~~~three~~~ four" popular browsers including Chrome, Firefox, Edge, and the last few major versions of IE.

If you run across issues running this form in a specific browser, use the [Discussions](https://github.com/nojronatron/Bigfoot-Bib-Report-WL-Form/discussions/11) page to bring up the issue.

Wanted: Your help and input! Contact K7RMZ at ARRL dot NET with a message about your interest(s), and be sure to include the name of this repository in the subject line.

## Branching and Pull Requests

This repository uses a Root branching pattern.

*main* is protected and requires approvals to merge in to.

Any new or patch commits must be based on "main" and ready to merge without merge conflict in order to be considered.

A Pull Request should have helpful comments within it:

1. Brief subject line indicating the fix or inhancement.
1. Detailed body with a problem-solution-result format.
1. Body of themessage shoudl include a link to an associated GitHub Issue (if it exists).
1. Include details on which browser(s) are affected.
