const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// in the filter I am looking for emails that are invalid, so emails that fail the regex test
export default (emails) => {
  const invalidEmails = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => re.test(email) === false);

    if (invalidEmails.length) {
      return `these emails are invalid ${invalidEmails}`;
    }

    return;
};
