const navigation = {
  data: {
    "status": "OK",
    "request_id": "3ffbb8af-3cb9-4160-87b6-b1c7069ea192",
    "parameters": {
    "query": "python developer in texas, usa",
    "page": 1,
    "num_pages": 1
    },
    "data": [
      {
        "id": "hO4waEApOOsAAAAAAAAAAA==",
        "station": "ACTION CHURCH AIYINASE",
        "constituency": "ELLEMBELE Constituency",
        "region": "WESTERN Region",
        "detail": "Enter Polling Station Results",
        "title": "Presidential Polls",
        "path": "presidential_sheet",
        "required": true,
      },
      {
        "id": "hO4waEXPOOsAAAAAAAAAAA==",
        "station": "ACTION CHURCH AIYINASE",
        "constituency": "ELLEMBELE Constituency",
        "region": "WESTERN Region",
        "detail": "Enter Polling Station Results",
        "title": "Parliamentary Polls",
        "path": "parliamentary_sheet",
        "required": true,
        "done": false,
      },
      {
        "id": "Z5O-WYY9YPkAAAAAAAAAAA==",
        "detail": "No results approved yet.",
        "title": "Approve Entered Results",
        "path": "approve",
        "required": true,
        "done": true,
      },
      {
        "id": "kXc3RgeQqSEAAAAAAAAAAA==",
        "detail": "Ends session",
        "title": "Logout",
        "path": "logout",
        "required": false,
      },
    ]
  }
}

/*
{
  "id": "coYJOHUuKwQAAAAAAAAAAA==",
  "detail": "0 / 14 Parties in Polling Station",
  "title": "Upload EC Summary Sheet (Polling Station)",
  "path": "file",
  "required": true,
  "done": false,
},
*/

const mockPresidentialResultSheet = {
  data: {
    "status": "OK",
    "request_id": "0343fd6a-cad9-4e12-9de1-feaae713d0ac",
    "parameters": {
      "job_id": "hO4waEcPOOsAAAAAAAAAAA==",
      "extended_publisher_details": false
    },
    "station": {
      "code": "A090783",
      "title": "Action Church Aiyinase"
    },
    "data": [
      {
        "pk": 1,
        "party__pk": 1,
        "party__code": "NDC",
        "party__title": "National Democratic Congress",
        "total_votes": 45689
      },
      {
        "pk": 2,
        "party__pk": 2,
        "party__code": "NPP",
        "party__title": "New Patriotic Party",
        "total_votes": 4583
      },
      {
        "pk": 3,
        "party__pk": 3,
        "party__code": "GUM",
        "party__title": "Ghana Union Movement",
        "total_votes": 9695
      },
      {
        "pk": 4,
        "party__pk": 4,
        "party__code": "APC",
        "party__title": "All People's Congress",
        "total_votes": 4583
      },
      {
        "pk": 5,
        "party__pk": 5,
        "party__code": "PPP", 
        "party__title": "Progressive People's Party",
        "total_votes": 5849
      },
      {
        "pk": 6,
        "party__pk": 6,
        "party__code": "GPP", 
        "party__title": "Ghana Freedom Party",
        "total_votes": 34594
      },
      {
        "pk": 7,
        "party__pk": 7,
        "party__code": "NDP", 
        "party__title": "National Democratic Party",
        "total_votes": 245323
      },
      {
        "pk": 8,
        "party__pk": 8,
        "party__code": "CPP", 
        "party__title": "Convention People's Party",
        "total_votes": 4069
      },
      {
        "pk": 9,
        "party__pk": 9,
        "party__code": "GCPP", 
        "party__title": "Great Consolidated Popular Party",
        "total_votes": 59443
      },
      {
        "pk": 10,
        "party__pk": 10,
        "party__code": "UFP",
        "party__title": "United Front Party",
        "total_votes": 45832
      },
      {
        "pk": 11,
        "party__pk": 11,
        "party__code": "UPP", 
        "party__title": "United Progressive Party",
        "total_votes": 48593
      },
      {
        "pk": 12,
        "party__pk": 12,
        "party__code": "PAP", 
        "party__title": "People's Action Party",
        "total_votes": 8493
      },
      {
        "pk": 13,
        "party__pk": 13,
        "party__code": "LPG", 
        "party__title": "Liberal Party of Ghana",
        "total_votes": 34480
      },
      {
        "pk": 14,
        "party__pk": 14,
        "party__code": "PNC", 
        "party__title": "People's National Convention",
        "total_votes": 485
      },
      {
        "pk": 15,
        "party__pk": 15,
        "party__code": "IND", 
        "party__title": "Independent",
        "total_votes": 74382
      }
    ]
  }
}
const mockParliamentaryResultSheet = {
  data: {
    "status": "OK",
    "request_id": "0343fd6a-cad9-4e12-9de1-feaae713d0ac",
    "parameters": {
      "job_id": "hO4waEcPOOsAAAAAAAAAAA==",
      "extended_publisher_details": false
    },
    "station": {
      "code": "A090783",
      "title": "Action Church Aiyinase"
    },
    "data": [
      {
        "pk": 1,
        "party__pk": 1,
        "party__code": "NDC",
        "party__title": "National Democratic Congress",
        "total_votes": 4555
      },
      {
        "pk": 2,
        "party__pk": 2,
        "party__code": "NPP",
        "party__title": "New Patriotic Party",
        "total_votes": 68946
      },
      {
        "pk": 3,
        "party__pk": 3,
        "party__code": "GUM",
        "party__title": "Ghana Union Movement",
        "total_votes": 9983
      },
      {
        "pk": 4,
        "party__pk": 4,
        "party__code": "APC",
        "party__title": "All People's Congress",
        "total_votes": 8345
      },
      {
        "pk": 5,
        "party__pk": 5,
        "party__code": "PPP", 
        "party__title": "Progressive People's Party",
        "total_votes": 85249
      },
      {
        "pk": 6,
        "party__pk": 6,
        "party__code": "GPP", 
        "party__title": "Ghana Freedom Party",
        "total_votes": 343594
      },
      {
        "pk": 7,
        "party__pk": 7,
        "party__code": "NDP", 
        "party__title": "National Democratic Party",
        "total_votes": 524433
      },
      {
        "pk": 8,
        "party__pk": 8,
        "party__code": "CPP", 
        "party__title": "Convention People's Party",
        "total_votes": 44069
      },
      {
        "pk": 9,
        "party__pk": 9,
        "party__code": "GCPP", 
        "party__title": "Great Consolidated Popular Party",
        "total_votes": 58933
      },
      {
        "pk": 10,
        "party__pk": 10,
        "party__code": "UFP",
        "party__title": "United Front Party",
        "total_votes": 4852
      },
      {
        "pk": 11,
        "party__pk": 11,
        "party__code": "UPP", 
        "party__title": "United Progressive Party",
        "total_votes": 4593
      },
      {
        "pk": 12,
        "party__pk": 12,
        "party__code": "PAP", 
        "party__title": "People's Action Party",
        "total_votes": 84493
      },
      {
        "pk": 13,
        "party__pk": 13,
        "party__code": "LPG", 
        "party__title": "Liberal Party of Ghana",
        "total_votes": 44880
      },
      {
        "pk": 14,
        "party__pk": 14,
        "party__code": "PNC", 
        "party__title": "People's National Convention",
        "total_votes": 385
      },
      {
        "pk": 15,
        "party__pk": 15,
        "party__code": "IND", 
        "party__title": "Independent",
        "total_votes": 742
      }
    ]
  }
}
const mockResultSheet = {
  data: {
    "status": "OK",
    "request_id": "0343fd6a-cad9-4e12-9de1-feaae713d0ac",
    "parameters": {
      "job_id": "hO4waEcPOOsAAAAAAAAAAA==",
      "extended_publisher_details": false
    },
    "station": {
      "code": "A090783",
      "title": "Action Church Aiyinase"
    },
    "data": [
        {
          "pk": 1,
          "party__pk": 1,
          "party__code": "NDC",
          "party__title": "National Democratic Congress",
          "total_votes": 45689
        },
        {
          "pk": 2,
          "party__pk": 2,
          "party__code": "NPP",
          "party__title": "New Patriotic Party",
          "total_votes": 4583
        },
        {
          "pk": 3,
          "party__pk": 3,
          "party__code": "GUM",
          "party__title": "Ghana Union Movement",
          "total_votes": 9695
        },
        {
          "pk": 4,
          "party__pk": 4,
          "party__code": "APC",
          "party__title": "All People's Congress",
          "total_votes": 4583
        },
        {
          "pk": 5,
          "party__pk": 5,
          "party__code": "PPP", 
          "party__title": "Progressive People's Party",
          "total_votes": 5849
        },
        {
          "pk": 6,
          "party__pk": 6,
          "party__code": "GPP", 
          "party__title": "Ghana Freedom Party",
          "total_votes": 34594
        },
        {
          "pk": 7,
          "party__pk": 7,
          "party__code": "NDP", 
          "party__title": "National Democratic Party",
          "total_votes": 245323
        },
        {
          "pk": 8,
          "party__pk": 8,
          "party__code": "CPP", 
          "party__title": "Convention People's Party",
          "total_votes": 4069
        },
        {
          "pk": 9,
          "party__pk": 9,
          "party__code": "GCPP", 
          "party__title": "Great Consolidated Popular Party",
          "total_votes": 59443
        },
        {
          "pk": 10,
          "party__pk": 10,
          "party__code": "UFP",
          "party__title": "United Front Party",
          "total_votes": 45832
        },
        {
          "pk": 11,
          "party__pk": 11,
          "party__code": "UPP", 
          "party__title": "United Progressive Party",
          "total_votes": 48593
        },
        {
          "pk": 12,
          "party__pk": 12,
          "party__code": "PAP", 
          "party__title": "People's Action Party",
          "total_votes": 8493
        },
        {
          "pk": 13,
          "party__pk": 13,
          "party__code": "LPG", 
          "party__title": "Liberal Party of Ghana",
          "total_votes": 34480
        },
        {
          "pk": 14,
          "party__pk": 14,
          "party__code": "PNC", 
          "party__title": "People's National Convention",
          "total_votes": 485
        },
        {
          "pk": 15,
          "party__pk": 15,
          "party__code": "IND", 
          "party__title": "Independent",
          "total_votes": 74382
        }
    ]
  }
}

const mockJobDetails = {
        data: {
            "status": "OK",
            "request_id": "0343fd6a-cad9-4e12-9de1-feaae713d0ac",
            "parameters": {
              "job_id": "hO4waEcPOOsAAAAAAAAAAA==",
              "extended_publisher_details": false
            },
            "data": [
              {
                "employer_name": "Infosys",
                "employer_logo": "https://cdn-ukwest.onetrust.com/logos/8d84415b-1b52-4bc4-8d5f-ca9a8eccaf8a/f7db8968-fc22-4620-92ac-dc05c5d2aa15/02460a41-565e-4cac-80a7-449bc8f77a72/logo-infosys.png",
                "employer_website": "http://www.infosys.com",
                "employer_company_type": "Information",
                "job_publisher": "LinkedIn",
                "job_id": "hO4waEcPOOsAAAAAAAAAAA==",
                "job_employment_type": "FULLTIME",
                "job_title": "Enter Polling Station Results",
                "job_apply_link": "https://www.linkedin.com/jobs/view/python-developer-at-infosys-3542764368",
                "job_apply_is_direct": false,
                "job_apply_quality_score": 0.5666,
                "job_description": "Job Description\n\nInfosys is seeking a Python Developer. This position\'s primary responsibility will be to provide technical expertise and coordinate for day-to-day deliverables for the team. The chosen candidate will assist in the technical design of large business systems; builds applications, interfaces between applications, understands data security, retention, and recovery. The role holder should be able to research on technologies independently to recommend appropriate solutions & should contribute to technology-specific best practices & standards; contribute to success criteria from design through deployment, including, reliability, cost-effectiveness, performance, data integrity, maintainability and scalability; contributes expertise on significant application components, program languages, databases, operating systems, etc., and guides/mentors the team during the build and test phases.\n\nCandidate must be located within commuting distance of Pennington NJ/Jersey City NJ/NYC, NY/Dallas TX or be willing to relocate to ANY mentioned areas within 4-6 weeks.\n\nU.S. citizens and those authorized to work in the U.S. are encouraged to apply. We are unable to sponsor at this time.\n\nRequired Qualifications\n• Bachelor’s degree or foreign equivalent required from an accredited institution. Will also consider three years of progressive experience in the specialty in lieu of every year of education.\n• At least 2 years of Information Technology experience\n• Experience in Python server-side programming\n• Expert in Object Oriented Programming Concepts\n\nPreferred Qualifications\n• At least 2 years of experience in Python Server Side native programming and in framework\n• At least 2 years of experience in Java/J2EE technologies and experience in frameworks like Spring, Hibernate\n• At least 2 or more years of hands-on experience in JS Framework\n• At least 2 years of experience in software development life cycle.\n• At least 2 years of experience in Project life cycle activities on development and maintenance projects.\n• Willing to work in application/production support\n• Experience in Banking domain\n• Strong communication and Analytical skills\n• Ability to work in team in diverse/ multiple stakeholder environment\n• Experience and desire to work in a Global delivery environment\n\nThe job entails sitting as well as working at a computer for extended periods of time. Should be able to communicate by telephone, email or face to face. Travel may be required as per the job requirements.\n\nAbout Us\n\nInfosys is a global leader in next-generation digital services and consulting. We enable clients in more than 50 countries to navigate their digital transformation. With over four decades of experience in managing the systems and workings of global enterprises, we expertly steer our clients through their digital journey. We do it by enabling the enterprise with an AI-powered core that helps prioritize the execution of change. We also empower the business with agile digital at scale to deliver unprecedented levels of performance and customer delight. Our always-on learning agenda drives their continuous improvement through building and transferring digital skills, expertise, and ideas from our innovation ecosystem.\n\nInfosys is an equal opportunity employer and all qualified applicants will receive consideration without regard to race, color, religion, sex, sexual orientation, gender identity, national origin, protected veteran status, spouse of protected veteran, or disability.",
                "job_is_remote": false,
                "job_posted_at_timestamp": 1680040912,
                "job_posted_at_datetime_utc": "2023-03-28T22:01:52.000Z",
                "job_city": "Dallas",
                "job_state": "TX",
                "job_country": "US",
                "job_latitude": 32.776665,
                "job_longitude": -96.79699,
                "job_benefits": null,
                "job_google_link": "https://www.google.com/search?gl=us&hl=en&q=hO4waEcPOOsAAAAAAAAAAA%3D%3D&cs=1&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=hO4waEcPOOsAAAAAAAAAAA%3D%3D&htidocid=hO4waEcPOOsAAAAAAAAAAA%3D%3D",
                "job_offer_expiration_datetime_utc": "2023-04-27T22:01:52.000Z",
                "job_offer_expiration_timestamp": 1682632912,
                "job_required_experience": {
                  "no_experience_required": false,
                  "required_experience_in_months": 36,
                  "experience_mentioned": true,
                  "experience_preferred": false
                },
                "job_required_skills": null,
                "job_required_education": {
                  "postgraduate_degree": false,
                  "professional_certification": false,
                  "high_school": false,
                  "associates_degree": false,
                  "bachelors_degree": true,
                  "degree_mentioned": true,
                  "degree_preferred": false,
                  "professional_certification_mentioned": false
                },
                "job_experience_in_place_of_education": false,
                "job_min_salary": null,
                "job_max_salary": null,
                "job_salary_currency": null,
                "job_salary_period": null,
                "job_highlights": {
                  "Qualifications": [
                    "The role holder should be able to research on technologies independently to recommend appropriate solutions & should contribute to technology-specific best practices & standards; contribute to success criteria from design through deployment, including, reliability, cost-effectiveness, performance, data integrity, maintainability and scalability; contributes expertise on significant application components, program languages, databases, operating systems, etc., and guides/mentors the team during the build and test phases",
                    "Candidate must be located within commuting distance of Pennington NJ/Jersey City NJ/NYC, NY/Dallas TX or be willing to relocate to ANY mentioned areas within 4-6 weeks",
                    "U.S. citizens and those authorized to work in the U.S. are encouraged to apply",
                    "Bachelor’s degree or foreign equivalent required from an accredited institution",
                    "Will also consider three years of progressive experience in the specialty in lieu of every year of education",
                    "At least 2 years of Information Technology experience",
                    "Experience in Python server-side programming",
                    "Expert in Object Oriented Programming Concepts",
                    "The job entails sitting as well as working at a computer for extended periods of time",
                    "Should be able to communicate by telephone, email or face to face",
                    "Travel may be required as per the job requirements"
                  ],
                  "Responsibilities": [
                    "This position’s primary responsibility will be to provide technical expertise and coordinate for day-to-day deliverables for the team",
                    "The chosen candidate will assist in the technical design of large business systems; builds applications, interfaces between applications, understands data security, retention, and recovery"
                  ]
                },
                "job_job_title": null,
                "job_posting_language": "en",
                "job_onet_soc": "15113200",
                "job_onet_job_zone": "4",
                "estimated_salaries": [
                  {
                    "location": "Dallas, TX",
                    "job_title": "Enter Polling Station Results",
                    "publisher_name": "ZipRecruiter",
                    "publisher_link": "https://www.ziprecruiter.com/Salaries/Full-Stack-Python-Developer-Salary-in-Dallas,TX",
                    "min_salary": 83383,
                    "max_salary": 150977,
                    "median_salary": 129639,
                    "salary_period": "YEAR",
                    "salary_currency": "USD"
                  },
                  {
                    "location": "Dallas, TX",
                    "job_title": "Upload EC Summary Sheet (Polling Station)",
                    "publisher_name": "Randstad USA",
                    "publisher_link": "https://www.randstadusa.com/salary/python-developer-salaries/dallas-texas",
                    "min_salary": 111297,
                    "max_salary": 168588,
                    "median_salary": 144293,
                    "salary_period": "YEAR",
                    "salary_currency": "USD"
                  },
                  {
                    "location": "Dallas, TX",
                    "job_title": "Entry Level Python Developer",
                    "publisher_name": "Salary.com",
                    "publisher_link": "https://www.salary.com/research/salary/posting/entry-level-python-developer-salary/dallas-tx",
                    "min_salary": 70882,
                    "max_salary": 115010,
                    "median_salary": 90592,
                    "salary_period": "YEAR",
                    "salary_currency": "USD"
                  }
                ],
                "apply_options": [
                  {
                    "publisher": "ZipRecruiter",
                    "apply_link": "https://www.ziprecruiter.com/c/Infosys-Limited/Job/Python-Developer/-in-Dallas,TX?jid=247bba0a2a494c6b&utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
                    "is_direct": false
                  },
                  {
                    "publisher": "Lensa",
                    "apply_link": "https://lensa.com/python-developer-jobs/dallas/jd/28fc15ab3a8fad4c3cb11e7cff76d302?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
                    "is_direct": false
                  }
                ],
                "employer_reviews": [
                  {
                    "publisher": "Glassdoor",
                    "employer_name": "Infosys",
                    "score": 3.3,
                    "num_stars": 3.5,
                    "review_count": 91708,
                    "max_score": 5,
                    "reviews_link": "https://www.glassdoor.com/Reviews/Infosys-Reviews-E7927.htm?utm_campaign=google_jobs_reviews&utm_source=google_jobs_reviews&utm_medium=organic"
                  },
                  {
                    "publisher": "Indeed",
                    "employer_name": "Infosys",
                    "score": 3.9,
                    "num_stars": 4,
                    "review_count": 15157,
                    "max_score": 5,
                    "reviews_link": "https://www.indeed.com/cmp/Infosys/reviews?utm_campaign=google_jobs_reviews&utm_source=google_jobs_reviews&utm_medium=organic"
                  },
                  {
                    "publisher": "AmbitionBox",
                    "employer_name": "Infosys",
                    "score": 3.9,
                    "num_stars": 4,
                    "review_count": 23656,
                    "max_score": 5,
                    "reviews_link": "https://www.ambitionbox.com/reviews/infosys-reviews?utm_campaign=google_jobs_reviews&utm_source=google_jobs_reviews&utm_medium=organic"
                  }
                ]
              }
            ]
        }
}

const mockSearch = {
        data: {
            "status": "OK",
            "request_id": "3ffbb8af-3cb9-4160-87b6-b1c7069ea192",
            "parameters": {
            "query": "python developer in texas, usa",
            "page": 1,
            "num_pages": 1
            },
            "data": [
            {
                "employer_name": "Infosys",
                "employer_logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKGQB_hmUVkx0HNjVmAKctp_E1gET48ocWSiKm&s=0",
                "employer_website": "http://www.infosys.com",
                "employer_company_type": "Information",
                "job_publisher": "LinkedIn",
                "job_id": "hO4waEcPOOsAAAAAAAAAAA==",
                "station": "ACTION CHURCH AIYINASE",
                "constituency": "ELLEMBELE Constituency",
                "region": "WESTERN Region",
                "job_employment_type": "FULLTIME",
                "job_title": "Enter Polling Station Results",
                "job_apply_link": "https://www.linkedin.com/jobs/view/python-developer-at-infosys-3542764368",
                "job_apply_is_direct": false,
                "job_apply_quality_score": 0.5666,
                "job_description": "Job Description\n\nInfosys is seeking a Python Developer. This position’s primary responsibility will be to provide technical expertise and coordinate for day-to-day deliverables for the team. The chosen candidate will assist in the technical design of large business systems; builds applications, interfaces between applications, understands data security, retention, and recovery. The role holder should be able to research on technologies independently to recommend appropriate solutions & should contribute to technology-specific best practices & standards; contribute to success criteria from design through deployment, including, reliability, cost-effectiveness, performance, data integrity, maintainability and scalability; contributes expertise on significant application components, program languages, databases, operating systems, etc., and guides/mentors the team during the build and test phases.\n\nCandidate must be located within commuting distance of Pennington NJ/Jersey City NJ/NYC, NY/Dallas TX or be willing to relocate to ANY mentioned areas within 4-6 weeks.\n\nU.S. citizens and those authorized to work in the U.S. are encouraged to apply. We are unable to sponsor at this time.\n\nRequired Qualifications\n• Bachelor’s degree or foreign equivalent required from an accredited institution. Will also consider three years of progressive experience in the specialty in lieu of every year of education.\n• At least 2 years of Information Technology experience\n• Experience in Python server-side programming\n• Expert in Object Oriented Programming Concepts\n\nPreferred Qualifications\n• At least 2 years of experience in Python Server Side native programming and in framework\n• At least 2 years of experience in Java/J2EE technologies and experience in frameworks like Spring, Hibernate\n• At least 2 or more years of hands-on experience in JS Framework\n• At least 2 years of experience in software development life cycle.\n• At least 2 years of experience in Project life cycle activities on development and maintenance projects.\n• Willing to work in application/production support\n• Experience in Banking domain\n• Strong communication and Analytical skills\n• Ability to work in team in diverse/ multiple stakeholder environment\n• Experience and desire to work in a Global delivery environment\n\nThe job entails sitting as well as working at a computer for extended periods of time. Should be able to communicate by telephone, email or face to face. Travel may be required as per the job requirements.\n\nAbout Us\n\nInfosys is a global leader in next-generation digital services and consulting. We enable clients in more than 50 countries to navigate their digital transformation. With over four decades of experience in managing the systems and workings of global enterprises, we expertly steer our clients through their digital journey. We do it by enabling the enterprise with an AI-powered core that helps prioritize the execution of change. We also empower the business with agile digital at scale to deliver unprecedented levels of performance and customer delight. Our always-on learning agenda drives their continuous improvement through building and transferring digital skills, expertise, and ideas from our innovation ecosystem.\n\nInfosys is an equal opportunity employer and all qualified applicants will receive consideration without regard to race, color, religion, sex, sexual orientation, gender identity, national origin, protected veteran status, spouse of protected veteran, or disability.",
                "job_is_remote": false,
                "job_posted_at_timestamp": 1680040912,
                "job_posted_at_datetime_utc": "2023-03-28T22:01:52.000Z",
                "job_city": "Dallas",
                "job_state": "TX",
                "job_country": "US",
                "job_latitude": 32.776665,
                "job_longitude": -96.79699,
                "job_benefits": null,
                "job_google_link": "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=python+developer+in+texas,+usa&start=0&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=python+developer+in+texas,+usa&htidocid=hO4waEcPOOsAAAAAAAAAAA%3D%3D",
                "job_offer_expiration_datetime_utc": "2023-04-27T22:01:52.000Z",
                "job_offer_expiration_timestamp": 1682632912,
                "job_required_experience": {
                  "no_experience_required": false,
                  "required_experience_in_months": 36,
                  "experience_mentioned": true,
                  "experience_preferred": false
                },
                "job_required_skills": null,
                "job_required_education": {
                  "postgraduate_degree": false,
                  "professional_certification": false,
                  "high_school": false,
                  "associates_degree": false,
                  "bachelors_degree": true,
                  "degree_mentioned": true,
                  "degree_preferred": false,
                  "professional_certification_mentioned": false
                },
                "job_experience_in_place_of_education": false,
                "job_min_salary": null,
                "job_max_salary": null,
                "job_salary_currency": null,
                "job_salary_period": null,
                "job_highlights": {
                  "Qualifications": [
                      "The role holder should be able to research on technologies independently to recommend appropriate solutions & should contribute to technology-specific best practices & standards; contribute to success criteria from design through deployment, including, reliability, cost-effectiveness, performance, data integrity, maintainability and scalability; contributes expertise on significant application components, program languages, databases, operating systems, etc., and guides/mentors the team during the build and test phases",
                      "Candidate must be located within commuting distance of Pennington NJ/Jersey City NJ/NYC, NY/Dallas TX or be willing to relocate to ANY mentioned areas within 4-6 weeks",
                      "U.S. citizens and those authorized to work in the U.S. are encouraged to apply",
                      "Bachelor’s degree or foreign equivalent required from an accredited institution",
                      "Will also consider three years of progressive experience in the specialty in lieu of every year of education",
                      "At least 2 years of Information Technology experience",
                      "Experience in Python server-side programming",
                      "Expert in Object Oriented Programming Concepts",
                      "The job entails sitting as well as working at a computer for extended periods of time",
                      "Should be able to communicate by telephone, email or face to face",
                      "Travel may be required as per the job requirements"
                  ],
                  "Responsibilities": [
                      "This position’s primary responsibility will be to provide technical expertise and coordinate for day-to-day deliverables for the team",
                      "The chosen candidate will assist in the technical design of large business systems; builds applications, interfaces between applications, understands data security, retention, and recovery"
                  ]
                },
                "job_job_title": null,
                "job_posting_language": "en",
                "job_onet_soc": "15113200",
                "job_onet_job_zone": "4"
            },
            {
                "employer_name": "Emonics LLC",
                "employer_logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAkousps1860om_f9e4FRdtJybUa7m9Iyy8Qmw&s=0",
                "employer_website": null,
                "employer_company_type": null,
                "job_publisher": "LinkedIn",
                "job_id": "coYJOHUuKwQAAAAAAAAAAA==",
                "job_employment_type": "0 / 14 Parties in Polling Station",
                "job_title": "Upload EC Summary Sheet (Polling Station)",
                "job_apply_link": "https://www.linkedin.com/jobs/view/python-developer-at-emonics-llc-3540927087",
                "job_apply_is_direct": false,
                "job_apply_quality_score": 0.5644,
                "job_description": "Hi,\n\nGreeting from Emonics...!!\n\nNo C2C required\n\nWe are looking for an experienced Python developer to join our engineering team and help us create dynamic software applications for our clients. In this role, you will be responsible for writing and testing scalable code, developing back-end components, and integrating user-facing elements in collaboration with front-end developers.\n\nTo be successful as a Python developer, you should possess in-depth knowledge of object-relational mapping, experience with server-side logic, and above-average knowledge of Python programming. Ultimately, a top-class Python developer is able to design highly responsive web-applications that perfectly meet the needs of the client.\n\nPython Developer Responsibilities:\n• Coordinating with development teams to determine application requirements.\n• Writing scalable code using Python programming language.\n• Testing and debugging applications.\n• Developing back-end components.\n• Integrating user-facing elements using server-side logic.\n• Assessing and prioritizing client feature requests.\n• Integrating data storage solutions.\n• Coordinating with front-end developers.\n• Reprogramming existing databases to improve functionality.\n• Developing digital tools to monitor online traffic.\n\nRequirements:\n• Bachelor's degree in computer science, computer engineering, or related field.\n• 3-5 years of experience as a Python developer.\n• Expert knowledge of Python and related frameworks including Django and Flask.\n• A deep understanding and multi-process architecture and the threading limitations of Python.\n• Familiarity with server-side templating languages including Jinja 2 and Mako.\n• Ability to integrate multiple data sources into a single system.\n• Familiarity with testing tools.\n• Ability to collaborate on projects and work independently when required.",
                "job_is_remote": false,
                "job_posted_at_timestamp": 1680042607,
                "job_posted_at_datetime_utc": "2023-03-28T22:30:07.000Z",
                "job_city": "Houston",
                "job_state": "TX",
                "job_country": "US",
                "job_latitude": 29.760427,
                "job_longitude": -95.369804,
                "job_benefits": null,
                "job_google_link": "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=python+developer+in+texas,+usa&start=0&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=python+developer+in+texas,+usa&htidocid=coYJOHUuKwQAAAAAAAAAAA%3D%3D",
                "job_offer_expiration_datetime_utc": "2023-04-27T22:30:07.000Z",
                "job_offer_expiration_timestamp": 1682634607,
                "job_required_experience": {
                "no_experience_required": false,
                "required_experience_in_months": 36,
                "experience_mentioned": true,
                "experience_preferred": false
                },
                "job_required_skills": null,
                "job_required_education": {
                "postgraduate_degree": false,
                "professional_certification": false,
                "high_school": false,
                "associates_degree": false,
                "bachelors_degree": true,
                "degree_mentioned": true,
                "degree_preferred": true,
                "professional_certification_mentioned": false
                },
                "job_experience_in_place_of_education": false,
                "job_min_salary": null,
                "job_max_salary": null,
                "job_salary_currency": null,
                "job_salary_period": null,
                "job_highlights": {
                "Qualifications": [
                    "To be successful as a Python developer, you should possess in-depth knowledge of object-relational mapping, experience with server-side logic, and above-average knowledge of Python programming",
                    "Bachelor's degree in computer science, computer engineering, or related field",
                    "3-5 years of experience as a Python developer",
                    "Expert knowledge of Python and related frameworks including Django and Flask",
                    "A deep understanding and multi-process architecture and the threading limitations of Python",
                    "Familiarity with server-side templating languages including Jinja 2 and Mako",
                    "Ability to integrate multiple data sources into a single system",
                    "Familiarity with testing tools",
                    "Ability to collaborate on projects and work independently when required"
                ],
                "Responsibilities": [
                    "In this role, you will be responsible for writing and testing scalable code, developing back-end components, and integrating user-facing elements in collaboration with front-end developers",
                    "Coordinating with development teams to determine application requirements",
                    "Writing scalable code using Python programming language",
                    "Testing and debugging applications",
                    "Integrating user-facing elements using server-side logic",
                    "Assessing and prioritizing client feature requests",
                    "Integrating data storage solutions",
                    "Coordinating with front-end developers",
                    "Reprogramming existing databases to improve functionality",
                    "Developing digital tools to monitor online traffic"
                ]
                },
                "job_job_title": null,
                "job_posting_language": "en",
                "job_onet_soc": "15113200",
                "job_onet_job_zone": "4"
            },
            {
                "employer_name": "Randstad USA",
                "employer_logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm_ah5pWH3U2cgW0AHYLvgIs-EvJ3FvqMp0Kk0&s=0",
                "employer_website": "http://www.randstadusa.com",
                "employer_company_type": "Staffing",
                "job_publisher": "Randstad USA",
                "job_id": "Z5O-WYY9YPkAAAAAAAAAAA==",
                "job_employment_type": "No results approved yet.",
                "job_title": "Approve Entered Results",
                "job_apply_link": "https://www.randstadusa.com/jobs/4/1002943/python-developer_richardson/",
                "job_apply_is_direct": false,
                "job_apply_quality_score": 0.7898,
                "job_description": "job summary:\nPosition Summary\n• Core Technology Infrastructure Organization:\n• Believes diversity makes us stronger so we can reflect, connect and meet the diverse needs of our clients and employees around the world\n• Is committed to building a workplace where every employee is welcomed and given the support and resources to perform their jobs successfully\n• Wants to be a great place for people to work and strives to create an environment where all employees have the opportunity to achieve their goals.\n• Provides continuous training and development opportunities to help employees achieve their career goals, whatever their background or experience.\n• Is committed to advancing our tools, technology, and ways of working to better serve our clients and their evolving business needs.\n• Believes in responsible growth and is dedicated to supporting our communities by connecting them to the lending, investing and giving them what they need to remain vibrant and vital.\n• Part of a cross functional team responsible for delivering client's network automation strategy. The application architect provides support and direction to the software developers team working on solutions. Technical strategy of the product, address technical debt and bugs, prioritize competing tasks for the team. They work closely with the Product Manager, scrum master of the team sizing the work, grooming the backlog and allocating it to the sprints based on the priorities of the work.\nRequired Skills\n• Strong enterprise application architecture experience. Strong software development and design skills in Python, Shell Scripting, Django, Django REST Framework & Angular, understanding of SDLC, agile methodologies and tooling Experience with Infrastructure as a code, Ansible AND/OR Itential , Object Oriented Analysis and Design (OOA & OOD). Experience in using Agile Tools such as Jira & Confluence\n• Use of Agile Processes and providing a leadership role in the various agile ceremonies (Scrums, Retrospectives, Sprint Planning, Program Planning & Backlog Grooming) as product owner\n• Experience of software development o Scripting: Python / Perl / Shell Scripting o Source Code Management: GIT / Subversion o Testing: Unit / Functional / Integration / Performance / Security o CICD Pipelines & Tools: Jenkins / Ansible\n• Good understanding of Application Management o Auto build / test / deployment o Security Integration: Active Directory / LDAP / OAuth / Public Key Infrastructure and Certificates\n• Logging: Splunk & ELK Demonstrable leadership skills in design of platforms, planning & delivering projects Good communication skills to facilitate priorities and tasks to all involved parties such as the team, stakeholders, scrum master and senior management\n• Good Familiarity with software architecture: API design & architecture o DB deployment strategies\n• High Availability architecture\n• Micro service / Mesh architectures o Cloud Infrastructure o Security & Threat Analysis o Support, Operations & Release Management o Enterprise Architecture\nDesired Skills\n• Experience with Network automations UI development- Angular is added advantage Knowledgeable on network management and monitoring tools Linux Knowledge of networks IP Addressing Routing / Switching Cisco Network Platforms Firewalls and Security Appliances SDWAN/SDA\nTop 3 Must Have Skillsets Required:\n• Ex: Java; CCAR; OTC; Agile; SQL Application Architecture, Python, Network Domain\n• Level of Experience Needed (required):\n\nlocation: Richardson, Texas\njob type: Contract\nsalary: $60 - 70 per hour\nwork hours: 9am to 5pm\neducation: Bachelors\n\nresponsibilities:\n• Provides continuous training and development opportunities to help employees achieve their career goals, whatever their background or experience.\n• Is committed to advancing our tools, technology, and ways of working to better serve our clients and their evolving business needs.\n• Believes in responsible growth and is dedicated to supporting our communities by connecting them to the lending, investing and giving them what they need to remain vibrant and vital.\n• Part of a cross functional team responsible for delivering client's network automation strategy. The application architect provides support and direction to the software developers team working on solutions. Technical strategy of the product, address technical debt and bugs, prioritize competing tasks for the team. They work closely with the Product Manager, scrum master of the team sizing the work, grooming the backlog and allocating it to the sprints based on the priorities of the work.\n\nqualifications:\n• Experience level: Experienced\n• Minimum 5 years of experience\n• Education: Bachelors\n\nskills:\n• Python\n\nEqual Opportunity Employer: Race, Color, Religion, Sex, Sexual Orientation, Gender Identity, National Origin, Age, Genetic Information, Disability, Protected Veteran Status, or any other legally protected group status.\n\nAt Randstad, we welcome people of all abilities and want to ensure that our hiring and interview process meets the needs of all applicants. If you require a reasonable accommodation to make your application or interview experience a great one, please contact HRsupport@randstadusa.com.\n\nPay offered to a successful candidate will be based on several factors including the candidate's education, work experience, work location, specific job duties, certifications, etc. In addition, Randstad offers a comprehensive benefits package, including health, an incentive and recognition program, and 401K contribution (all benefits are based on eligibility).\n\nFor certain assignments, Covid-19 vaccination and/or testing may be required by Randstad's client or applicable federal mandate, subject to approved medical or religious accommodations. Carefully review the job posting for details on vaccine/testing requirements or ask your Randstad representative for more information.",
                "job_is_remote": false,
                "job_posted_at_timestamp": 1679961600,
                "job_posted_at_datetime_utc": "2023-03-28T00:00:00.000Z",
                "job_city": "Richardson",
                "job_state": "TX",
                "job_country": "US",
                "job_latitude": 32.948334,
                "job_longitude": -96.72985,
                "job_benefits": [
                  "health_insurance",
                  "retirement_savings",
                  "dental_coverage"
                ],
                "job_google_link": "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=python+developer+in+texas,+usa&start=0&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=python+developer+in+texas,+usa&htidocid=Z5O-WYY9YPkAAAAAAAAAAA%3D%3D",
                "job_offer_expiration_datetime_utc": "2023-04-27T00:00:00.000Z",
                "job_offer_expiration_timestamp": 1682553600,
                "job_required_experience": {
                  "no_experience_required": false,
                  "required_experience_in_months": 60,
                  "experience_mentioned": true,
                  "experience_preferred": false
                },
                "job_required_skills": [
                  "Python"
                ],
                "job_required_education": {
                "postgraduate_degree": false,
                "professional_certification": false,
                "high_school": false,
                "associates_degree": false,
                "bachelors_degree": true,
                "degree_mentioned": true,
                "degree_preferred": false,
                "professional_certification_mentioned": true
                },
                "job_experience_in_place_of_education": false,
                "job_min_salary": 60,
                "job_max_salary": 70,
                "job_salary_currency": "USD",
                "job_salary_period": "HOUR",
                "job_highlights": {
                "Qualifications": [
                    "Strong enterprise application architecture experience",
                    "Strong software development and design skills in Python, Shell Scripting, Django, Django REST Framework & Angular, understanding of SDLC, agile methodologies and tooling Experience with Infrastructure as a code, Ansible AND/OR Itential , Object Oriented Analysis and Design (OOA & OOD)",
                    "Scripting: Python / Perl / Shell Scripting",
                    "Source Code Management: GIT / Subversion",
                    "Testing: Unit / Functional / Integration / Performance / Security",
                    "CICD Pipelines & Tools: Jenkins / Ansible",
                    "Good understanding of Application Management",
                    "Auto build / test / deployment",
                    "Good Familiarity with software architecture: API design & architecture",
                    "DB deployment strategies",
                    "High Availability architecture",
                    "Top 3 Must Have Skillsets Required:",
                    "Ex: Java; CCAR; OTC; Agile; SQL Application Architecture, Python, Network Domain",
                    "Level of Experience Needed (required):",
                    "Experience level: Experienced",
                    "Minimum 5 years of experience",
                    "Education: Bachelors"
                ],
                "Responsibilities": [
                    "Is committed to advancing our tools, technology, and ways of working to better serve our clients and their evolving business needs",
                    "Believes in responsible growth and is dedicated to supporting our communities by connecting them to the lending, investing and giving them what they need to remain vibrant and vital",
                    "Part of a cross functional team responsible for delivering client's network automation strategy",
                    "The application architect provides support and direction to the software developers team working on solutions",
                    "Technical strategy of the product, address technical debt and bugs, prioritize competing tasks for the team",
                    "They work closely with the Product Manager, scrum master of the team sizing the work, grooming the backlog and allocating it to the sprints based on the priorities of the work",
                    "Use of Agile Processes and providing a leadership role in the various agile ceremonies (Scrums, Retrospectives, Sprint Planning, Program Planning & Backlog Grooming) as product owner",
                    "Support, Operations & Release Management",
                    "work hours: 9am to 5pm"
                ],
                "Benefits": [
                    "salary: $60 - 70 per hour",
                    "In addition, Randstad offers a comprehensive benefits package, including health, an incentive and recognition program, and 401K contribution (all benefits are based on eligibility)"
                ]
                },
                "job_job_title": null,
                "job_posting_language": "en",
                "job_onet_soc": "15113200",
                "job_onet_job_zone": "4"
            },
            {
                "employer_name": "Genpact",
                "employer_logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTadgFKmESWrJe5UOikoeYtKtw9OkXyROMMqhsU&s=0",
                "employer_website": "http://www.genpact.com",
                "employer_company_type": "Consulting",
                "job_publisher": "LinkedIn",
                "job_id": "kXc3RgeQqSEAAAAAAAAAAA==",
                "job_employment_type": "Ends session",
                "job_title": "Logout",
                "job_apply_link": "https://www.linkedin.com/jobs/view/python-developer-at-genpact-3542180433",
                "job_apply_is_direct": false,
                "job_apply_quality_score": 0.5561,
                "job_description": "With a startup spirit and 80,000+ curious and courageous minds, we have the expertise to go deep with the world’s biggest brands—and we have fun doing it. Now, we’re calling all you rule-breakers and risk-takers who see the world differently, and are bold enough to reinvent it. Come, transform with us.\n\nInviting applications for the role of Senior Python Developer - Lead Consultant\n\n· Strong python skills\n\n· Snowflake expertise is preferred– can be trained, if candidate has strong SQL skills.\n\n· AWS knowledge – specifically on services like S3 ,SNS, ECS.\n\n· Candidate should be familiar with the Financial domain knowledge.\n\n“The approximate annual base compensation range for this position is $80,000 to $90,000. The actual offer, reflecting the total compensation package plus benefits, will be determined by a number of factors which include but are not limited to the applicant’s experience, knowledge, skills, and abilities; geographic location; and internal equity.”\n\nGenpact is an Equal Opportunity Employer and considers applicants for all positions without regard to race, color, religion or belief, sex, age, national origin, citizenship status, marital status, military/veteran status, genetic information, sexual orientation, gender identity, physical or mental disability or any other characteristic protected by applicable laws. Genpact is committed to creating a dynamic work environment that values diversity and inclusion, respect and integrity, customer focus, and innovation. For more information, visit www.genpact.com. Follow us on Twitter, Facebook, LinkedIn, and YouTube.",
                "job_is_remote": false,
                "job_posted_at_timestamp": 1679942646,
                "job_posted_at_datetime_utc": "2023-03-27T18:44:06.000Z",
                "job_city": "Austin",
                "job_state": "TX",
                "job_country": "US",
                "job_latitude": 30.267153,
                "job_longitude": -97.74306,
                "job_benefits": null,
                "job_google_link": "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=python+developer+in+texas,+usa&start=0&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=python+developer+in+texas,+usa&htidocid=kXc3RgeQqSEAAAAAAAAAAA%3D%3D",
                "job_offer_expiration_datetime_utc": "2023-04-26T18:44:06.000Z",
                "job_offer_expiration_timestamp": 1682534646,
                "job_required_experience": {
                "no_experience_required": false,
                "required_experience_in_months": null,
                "experience_mentioned": true,
                "experience_preferred": false
                },
                "job_required_skills": null,
                "job_required_education": {
                "postgraduate_degree": false,
                "professional_certification": false,
                "high_school": false,
                "associates_degree": false,
                "bachelors_degree": true,
                "degree_mentioned": false,
                "degree_preferred": false,
                "professional_certification_mentioned": false
                },
                "job_experience_in_place_of_education": false,
                "job_min_salary": null,
                "job_max_salary": null,
                "job_salary_currency": null,
                "job_salary_period": null,
                "job_highlights": {
                "Qualifications": [
                    "AWS knowledge – specifically on services like S3 ,SNS, ECS",
                    "Candidate should be familiar with the Financial domain knowledge"
                ],
                "Benefits": [
                    "“The approximate annual base compensation range for this position is $80,000 to $90,000",
                    "The actual offer, reflecting the total compensation package plus benefits, will be determined by a number of factors which include but are not limited to the applicant’s experience, knowledge, skills, and abilities; geographic location; and internal equity.”"
                ]
                },
                "job_job_title": null,
                "job_posting_language": "en",
                "job_onet_soc": "15113200",
                "job_onet_job_zone": "4"
            },
            ]
        }
}

export {
  navigation, mockPresidentialResultSheet, mockParliamentaryResultSheet, mockResultSheet, mockSearch, mockJobDetails
}