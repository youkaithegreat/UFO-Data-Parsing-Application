# UFO-Data-Parsing-Application

UFO Data Search API Built with ExpressJS, Axios &amp; Cheerios

### Live Deployment with Amazon Web Services, CodePipeline and Elastic Beanstalk is available at http://ufoapi-env.eba-2vhrwjtj.us-east-1.elasticbeanstalk.com/api/ufo

### Live Deployment available at Heroku https://ufo-api-cheerios-axios.herokuapp.com/api/ufo

This API uses ExpresJS to provide the routing. There is no index.html and can only be accessed from /api/ufo/

The purpose of this API is a showcase of the abilities of routing and query selectors in ExpressJS.
I kept the styling simple just to showcase the data that was being pulled from the resource.

I use Axios to pull the HTML information from the website and then Cheerio to parse that information.

The State is specific to Idaho as I couldn't find a full National List on their website.

### Installation - Usage

Download the Zip file from the repository

```
npm install
```

Default Port is set to 3000 if it's not being hosted

Access it with localhost:PORT/api/ufo

**Query Selectors**
api/ufo?KEY=SEARCHTERM

Key and Search Term are both currently case sensitive

### Resources Used

Base Reference: https://www.section.io/engineering-education/build-a-web-scraper-using-cheerio/
National UFO Reporting Center https://nuforc.org/webreports/ndxlID.html

### Improvemnets, Next Steps, Thoughts, Miscellaneous

Project was uploaded 8/12/2022 and last updated 8/12/2022
If the application stops working on Heroku or AWS I've either removed them as they utilize too much bandwidth or the base URL that I parse information from has changed their format.

If I were to improve anything, I could import the data into a MongoDB database or Mongo Atlas, but at this time I don't feel it's necessary.
All these services are "free", but feel it's dangerous to have too many running that I might forget about.
