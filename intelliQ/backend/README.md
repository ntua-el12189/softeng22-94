# API documentation

{baseURL}/{service}/{path-to-resource}?**format={json|csv}**

- Αν δεν παρέχεται το format, η default τιμή είναι json

## HTTP codes

- **200** Success
- **400** Bad request
- **404** No data
- **500** Internal Server Error

## API Endpoints

### Admin

1. **GET** _/admin/healthcheck_: Επιστρέφει { status: ok, dbconnection: string} | {status:failed, dbconnection:string}

2. **POST** _/admin/questionnaire_upd_ : Ανέβασμα JSON δεδομένων του ερωτηματολογίου

3. **POST** _/admin/resetall_ : Αρικοποίηση του συστήματος

4. **POST** _/admin/resetq/:quesitonnaireID_ : Διαγραφή των απαντήσεων ενός ερωτηματολογίου

### Functional

1. **GET** _/questionnaire/:questionnaireID_ : Κλήση http GET η οποία επιστρέφει object που περιέχει τα γενικά στοιχεία και τις ερωτήσεις του
   ερωτηματολογίου με αναγνωριστικό questionnaireID, ταξινομημένες ως προς το αναγνωριστικό της
   ερώτησης.
2. **GET** \_/question/:questionnaireID/:questionID : πιστρέφει object που περιέχει τα πλήρη στοιχεία της ερώτησης questionID
   του ερωτηματολογίου questionnaireID.
3. **POST** _/doanswer/:questionnaireID/:questionID/:session/:optionID_ : Αρικοποίηση του συστήματος
4. **POST** _/admin/resetall_ : Αρικοποίηση του συστήματος
5. **POST** _/admin/resetall_ : Αρικοποίηση του συστήματος
6. **POST** _/admin/resetall_ : Αρικοποίηση του συστήματος
