# PROJECT NAME - FRONT END

Developed as the final project of our web development bootcamp at Ironhack Barcelona. It's a MERN Stack application, check the backend repository [here](https://github.com/youraccount/repo).
Watchadoin' is an event planner app. You will be able to know what your friends are up to and join in on their plans. If you can see a plan it means you are "invited" to attend. [here](https://github.com/youraccount/repo).

## About us
Our names are Camila Buldin, Lisa Schwetlick and Raquel Barrio.

![Project Image](https://t4.ftcdn.net/jpg/01/45/03/99/360_F_145039942_TlScPbqEWiBMPpfSyJyhBBCPcr1l52dP.jpg "Project Image")

## Deployment
You can check the app fully deployed [here](https://www.cactuscoleccion.com/). If you wish to view the API deployment instead, check [here](https://www.cactuscoleccion.com/).

## Work structure
We used [Discord](https://discord.com/) to organize our workflow.

## Installation guide
- Fork this repo
- Clone this repo 

```shell
$ cd project-front
$ npm install
$ npm start
```

## Routes
| Route                                     | Privacy         | Renders                  |
| ------------------------------------------| :-------------: | ------------------------ |
| /                                         | only logged out | HomePage                 |
| /signup                                   | only logged out | SignupPage               |
| /login                                    | only logged out | LoginPage                |
| /logout                                   | private         | LogoutPage, it redirects to login |
| /dashboard                                | private         | DashboardPage            |
| /:username                        | private         | UserProfilePage with conditional rendering |
| /:username/edit                   | private         | EditProfilePage          |
| /:username/friends                | private         | UserProfilePage (with "Friends" instead of "FriendsOverview")| <!-- changeLater: I think it's easier if we don't have this route -->
| /:username/requests               | private         | UserProfilePage (with "FriendsPending" instead of "FriendsOverview"| <!-- changeLater: I think it's easier if we don't have this route -->
| /:username/friendslists           | private         | UserProfilePage (with <FriendLists/>, and if you click on any of them also <FriendListDetails/>))| <!-- changeLater: I think it's easier if we don't have this route -->
| /:username                        | private         | UserProfilePage (with <CreateEvent/>, if you click on new event)|
| /:username/event/:eventId         | private         | EventDetailPage        |
| /*                                        | public          | ErrorPage                |



## Components
- Navbar
- Calendar
- ConfirmedEvents
- NewEvents
- EventDetail
- MyEvents
- FriendLists
- FriendListDetails
- FriendsOverview
- Friends
- FriendsAll
- FriendsPending
- Notifications
- CreateEvent
- Map (google)
- ...
