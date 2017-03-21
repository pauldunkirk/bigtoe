
CREATE TABLE gigs (
    id SERIAL PRIMARY KEY,
    "gig"CREATE TABLE gigs (
        id SERIAL PRIMARY KEY,
        "gig" VARCHAR(80),
        "address" VARCHAR(80),
        "website" VARCHAR(80),
        "date" date,
        "soundcheck" date,
        "start-end" date,
        "pay" INT,
        "guitar" VARCHAR(20),
        "trumpt" VARCHAR(20),
        "trombone" VARCHAR(20),
        "sax" VARCHAR(20),
        "keys" VARCHAR(20),
        "bass" VARCHAR(20),
        "female-vocals" VARCHAR(20),
        "drums" VARCHAR(20),
        "male-vocals" VARCHAR(20),
        "prod-person" VARCHAR(20),
        "prod-cost" INT,
        "prod-size" VARCHAR(20)
    );

    ALTER TABLE gigs ALTER COLUMN soundcheck TYPE timestamp;
     ALTER TABLE gigs ALTER COLUMN "start_end" TYPE timestamp;


    INSERT INTO gigs ("gig", "address", "website", "date", "soundcheck", "start-end", "pay", "guitar", "trumpet",
        "trombone", "sax", "keys", "bass", "female-vocals", "drums", "male-vocals", "prod-person", "prod-cost",
        "prod-size")
         VALUES ('Schuller''s Golden Valley','7345 Country Club Dr, Minneapolis, MN 55427','http://www.schullerstavern.com/','2017-03-25 ','6:30','8:30-12:30','$100 ','Chris','Gerard','John','Bergy','Brian','Aaron','Paula','Nate','Paul','Tim F',150,'mix'),
          ('Treasure Island 5 rooms, 1meal','5734 Sturgeon Lake Rd, Welch, MN 55089','http://www.ticasino.com/','2017-03-31 ',NULL,'8:30-1:30','$120 ','Chris','Tom Krochock','John','Bergy','Brian','Aaron','Paula','Jamie','Paul','NA',NULL,'NA'),
          ('Treasure Island 5 rooms, 1meal','5734 Sturgeon Lake Rd, Welch, MN 55089','http://www.ticasino.com/','2017-04-01 ',NULL,'8:30-1:30','$120 ','Chris','Gerard ','John','Bergy','Brian','Aaron','Paula','Jamie','Paul','NA',NULL,'NA'),

          ('Mystic','2400 Mystic Lake Blvd NW, Prior Lake, MN 55372','http://www.mysticlake.com/','2017-04-15 ','7:00','8pm-1am','$120 ','cannot','Cannot do','Cody LeDuc','Bergy','Brian','Aaron','Paula','Jamie','Paul','NA',NULL,NULL),
          ('Schuller''s Golden Valley','7345 Country Club Dr, Minneapolis, MN 55427','http://www.schullerstavern.com/','2017-04-29 ',NULL,'8:30-12:30','$100 ','Chris','Cannot do','Ben Bussey','Bergy',NULL,NULL,'Paula','Jamie','Paul','PJ',NULL,'mix'),
          ('Tim''s wedding Buffalo',NULL,NULL,'2017-05-27 ',NULL,'details to come','140','Chris','Gerard','John','Bergy','Theo','Aaron','Paula','Jamie','Paul','Tim',NULL,'full'),
          ('PrivateParty- Minnetonka',NULL,NULL,'2017-05-28 ',NULL,'details to come','150 ','Chris','Gerard','John','Bergy','Theo','Aaron','Paula','Jamie','Paul','PJ?',NULL,NULL),
          ('possible Gustavus Alumni concert',NULL,NULL,'2017-06-03 ','6?','9-10pm','',NULL,'Gerard',NULL,'Bergy',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
          ('John''s friend''s wedding',NULL,NULL,'2017-06-10 ',NULL,'details to come','140','Chris','Gerard','John','Bergy',NULL,'Aaron','Paula','Jamie','Paul','?',NULL,NULL),
          ('Johnnie Timm''s wedding, Chisago, MN',NULL,NULL,'2017-06-17 ',NULL,'details to come','140','Chris','Gerard','John',NULL,'Brian','Aaron','Paula','Jamie','Paul','PJ',NULL,'full'),
          ('Sal''s in St Joseph (hired by St John''s Univ)','109 W Minnesota St, St Joseph, MN 56374','http://salsbar.azurewebsites.net/','2017-06-24 ',NULL,'8pm-10:30pm','$140 ','maybe','Gerard ','John','Bergy','Brian','Aaron',NULL,'Jamie','Paul','PJ',NULL,'full'),
          ('Summertime By George Festival - St Cloud ','Lake George Municipal Complex, 1101 7th St S, St Cloud, MN 56301','http://www.summertimebygeorge.com/','2017-07-26 ',NULL,'setup 4:00, gig 6:30-9:00','$200 ','Chris','Gerard','John',NULL,'Brian','Aaron','Paula','Jamie','Paul','NA',NULL,'NA'),
          ('Ki Chi Saga Days, Chisago, MN','10625 Railroad Ave, Chisago City, MN 55013','https://www.facebook.com/KiChiSagaDays/','2017-08-19 ',NULL,'3:30-5:30','$100 ','Chris','Cannot do','John','Bergy',NULL,NULL,NULL,NULL,'Paul','?',NULL,'full'),
          ('McKinsey Niehaus (Bergy''s friend) Millennium Hotel Minneapolis','1313 Nicollet Mall, Minneapolis, MN 55403','https://www.millenniumhotels.com/en/minneapolis/millennium-hotel-minneapolis/','2017-09-16 ',NULL,'scheck 5pm, 8:00-12:00','$140 ','Chris','Gerard ','John','Bergy',NULL,'Aaron',NULL,'Jamie','Paul','PJ',NULL,'full'),
          ('Hutchinson Health Foundation Gala, Crow River Winery','14848 MN-7, Hutchinson, MN 55350','http://www.crowriverwinery.com/','2017-11-18 ',NULL,'setup by 6, gig 8-12','$150 ','Chris','Gerard ','John','Bergy',NULL,'Aaron',NULL,'Jamie','Paul','PJ',NULL,'full'),
          ('Birch''s on the Lake','1310 Wayzata Blvd, Long Lake, MN 55356','http://www.birchsonthelake.com/','2017-12-09 ',NULL,'8pm-12','$100 ',NULL,'Cannot do',NULL,'Bergy',NULL,NULL,NULL,NULL,'Paul',NULL,NULL,'mix');


          INSERT INTO gigs ("gig", "address", "website", "date", "soundcheck", "start-end", "pay", "guitar", "trumpet",
              "trombone", "sax", "keys", "bass", "female-vocals", "drums", "male-vocals", "prod-person", "prod-cost",
              "prod-size")
               VALUES('Ki Chi Saga Days, Chisago, MN','10625 Railroad Ave, Chisago City, MN 55013','https://www.facebook.com/KiChiSagaDays/','2017-08-19 ',NULL,'3:30-5:30','$100 ','Chris','Cannot do','John','Bergy',NULL,NULL,NULL,NULL,'Paul','?',NULL,'full'),
               ('McKinsey Niehaus (Bergy''s friend) Millennium Hotel Minneapolis','1313 Nicollet Mall, Minneapolis, MN 55403','https://www.millenniumhotels.com/en/minneapolis/millennium-hotel-minneapolis/','2017-09-16 ',NULL,'8:00-12:00','$140 ','Chris','Gerard ','John','Bergy',NULL,'Aaron',NULL,'Jamie','Paul','PJ',NULL,'full'),
               ('Hutchinson Health Foundation Gala, Crow River Winery','14848 MN-7, Hutchinson, MN 55350','http://www.crowriverwinery.com/','2017-11-18 ',NULL,'setup by 6, gig 8-12','$150 ','Chris','Gerard ','John','Bergy',NULL,'Aaron',NULL,'Jamie','Paul','PJ',NULL,'full'),
               ('Birch''s on the Lake','1310 Wayzata Blvd, Long Lake, MN 55356','http://www.birchsonthelake.com/','2017-12-09 ',NULL,'8pm-12','$100 ',NULL,'Cannot do',NULL,'Bergy',NULL,NULL,NULL,NULL,'Paul',NULL,NULL,'mix');
