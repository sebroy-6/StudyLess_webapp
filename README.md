# StudyLess - Studyaid web app

> ## Note: This repository is made only for demonstration purposes 

## Table of contents

1. [Introduction](#introduction)  
1.1 [demo](#video-demo)  

2. [Features](#features)  
2.1 [Task manager](#manage-your-daily-tasks)  
2.2 [Study timer](#breakdown-your-time)

3. [Architecture](#project-architecture)

4. [In Development](#in-development)

# Introduction

The goal of this project is to create a website that help students simplify and optimise their studying schedule. This project is ongoing and will receive new features as time goes on.

## Video Demo

[![Watch the video](images/Demo-thumbnail.png)](https://www.youtube.com/watch?v=UpgRUPS-Gks&ab_channel=S%C3%A9bastienRoy)

# Features

## Manage your daily tasks

By using the student oriented task form, your tasks can now be sorted in a meaningful manner.
![Screenshot](images/tasksScreen.png)

### Drag & Drop

The tasks can also be dragged from one list to another to help the user visually organise their tasks.
![Screenshot](./images/draggingTask.png)

### Edit tasks

In the event of a mistake or change in plans, tasks can also be modified, marked as completed or event deleted by opening up the task editor (three dots when hovering over a task).

![Screenshot](./images/EditTask.png)

## Breakdown your time

By using the study timer, users can cycle through different work cycles including studying (25min), small break (5min) & longer break (15min). 

This time seperation technique is called Pomodoro & it's goal is to optimise focus & productivity when studying by integrating multiple small breaks in your studying sessions.
![Screenshot](./images/timerScreen.png)

# Project architecture
This project uses the popular MERN stack group of technologies. This includes MongoDB for the persistance layer, Node.js using the Express.js framework for the backend application & React.js for the frontend application (rendered and updated on the client's machine).
![Screenshot](./images/ProjectArchitecture.png)

As you can see, this architecure is following the Model-Vue-Control(MVC) structure commonly seen in many fullstack applications.

# In Development

This section is dedicated to the functionnalities comming in the futur.

## functionnalities to implement

- sort tasks by due date
- Edit time seperation in study timer
- Save time in timer while not in timer page (by using webworker?)

## Study tools to implement

- flash cards study tool
- Study Schedule (maybe with Google Calender compatibility)
- virtual sticky notes (for reminders & quick notes)

## Contact Info
- [LinkedIn](https://www.linkedin.com/in/s%C3%A9bastien-roy-611245213/)