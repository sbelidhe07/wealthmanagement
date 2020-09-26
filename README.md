# WealthHeld Management

###### Building a webapp that shows all the companies and institutions in the world by amount of wealth and can update in real time.Complete list of categories that are part of this web app are:
  * Tech companies 
  * Government Institutions 
  * Wealthy Individuals and Families 
  * Wealthy Non-Profit Organizations 
  * Religious Groups 
  * NGO’s.

## Analysis
* we will create a scraper to pull data related to Wealthy NGOS, Wealthy Religious Organizations ,Wealthy Individuals Time Series Info from Wikipedia data sites
* We will create a scraper to pull data related to Non -profit organizations from https://www.tharawat-magazine.com/facts/top-5-richest-nonprofit-organizations/ which populate the statistics from source The NonProfit Times
* we will create a scraper to pull data related to wealthy universities from  https://www.workandmoney.com/s/largest-university-endowments-5b629e22f6fc4046
* We will use Forbes rest api (https://forbes400.herokuapp.com/api/forbes400/?limit=10) to pull data related to Wealthy Individuals
* We will use Bloomberg or wikipedia to retrieve Wealthy Families info by creating a scraper

###### Tables
- Data Categories -- Contains all the categories related the info we are trying to create
- WealthHeld - Contains all the current Wealth Held info for all the categories
- WealthHeldTS - Contains all the time series Wealth Held info for all the categories

###### Technology Stack
* Python 3.8
* matplotlib and pandas python library for Data Visualization
* Django
* ReactJs
* D3 - Data Visualization in UI
* Mysql 5.7 - Database for storing data
* Mysql-client@5.7 for Database Connector

###### work done till now
* Created scrapers for pulling Wealthy Individuals Current and time series data using forbes400 REST API along with logic for storing in DB
* Created scraper for pulling Wealthy Family from wikipedia and added logic to visualize the data using maptolib and pandas libraries
* Created scrapper for pulling the universities data from work and money site
* Created scrapper for pulling the Non Proit Organization data from tharawat magazine
* Created Data Visulation graphs (Bar and pie charts) depicting the Current Wealthy Individuals using D3 + ReactJS

###### Below stated are screen shots of all the Data Visulation Graphs

