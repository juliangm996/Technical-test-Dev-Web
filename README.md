# Technical-test-TP-Dev-Web-V2

**Description of the challenge:**

  Develop a web application that requests an identification number and consumes a service to validate that the company can register through a web form.
  
  After capturing the information, the company&#39;s data must be sent to the backend.
  
  1.
  # Project documentation
  
  1.When entering the registration view, the NIT of the company to be registered and a button to continue must be requested.
  
  1. The identification is validated by consuming a service backend in .Net (C# or VB). The service will return if the company can or cannot make the registration and the reason why it cannot make it, additionally if the company can make the registration, the data associated to the company will be delivered.
  
  
  1. A form will be presented with the company data returned by the previous service and should allow the user to update the information. The form must contain the following data:
  
  - **Identification Type:** Drop-down list with the options for the Identification Type. Mandatory
  - **Identification number:** You must only allow the entry of numbers. Required
  - **Company name:** This field must only be requested when the type of identification is NIT or foreign identification. Mandatory
  - **First name:** This field must only be requested when the type of identification is not NIT or foreign identification. Mandatory
  - **Second name:** This field must only be requested when the type of identification is not NIT or foreign identification.
  - **First last name:** This field must only be requested when the type of identification is not NIT or foreign identification. Mandatory
  - **Second last name:** This field must only be requested when the type of identification is not NIT or foreign identification.
  - **E-mail:** It must be validated as a valid e-mail. The applicant must set this validation criterion. Required
  - I authorize the sending of messages to the cell phone provided: Single selection field.
  - I authorize messages to be sent to the following e-mail address: Single selection field
  
  1. The company data must be sent to the company registration service, this service will indicate if the registration was successful or if it generated an error. In case of error, the user must be informed so that he/she can make the corresponding adjustment.
  
  **Remarks:**
  
  - In numeric fields, letters should not be allowed.
  - In alphabetical fields, numbers should not be allowed.
  
  1.
  # Technical Specifications
  
  - The application must be built in Angular 10 or React 16 onwards.
  - Use .Net to create the service in the backend.
  - The company information can be stored in flat files or a database (SQL Server).
  - The services return error conditions in the code and message fields, which must be reported to the user. In case no error is generated, the code field arrives in &quot;&quot; or &quot;0&quot;.
  - When there is an inconsistency in any field, the user should be told what the inconsistency is and not be allowed to continue until it is corrected. The applicant can propose the method of feedback to the user.
  
  **Test data**
  
  Company unable to register:
  
  900674335
  
  Company that can perform the registration: 900674336,811033098
