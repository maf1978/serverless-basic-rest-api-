'use strict';
const DynamoDB = require("aws-sdk/clients/dynamodb");
const documentClient = new DynamoDB.DocumentClient({ region: 'us-east-1' });
const NOTES_TABLE_NAME = process.env.NOTES_TABLE_NAME;

module.exports.createNote = async (event, context, cb) => {
  let data = JSON.parse(event.body);
  try {
    const params = {
      TableName: "notes",
      Item: {
        notesId: data.id,
        title: data.title,
        body: data.body
      },
      ConditionExpression: "attribute_not_exists(noteId)"
    }
    await documentClient.put(params).promise();
    cb(null, {
      statusCode: 201,
      body: JSON.stringify(data)
    });
  } catch (err) {
    cb(null, {
      statusCode: 500,
      body: JSON.stringify(err.message)
    });
  }  
};

module.exports.updateNote = async (event, context, cb) => {
  let notesId = event.pathParameters.id;
  let data = JSON.parse(event.body);
  try{


    const params = {
      TableName: NOTES_TABLE_NAME,
      Key: { notesId },
      UdateExpression; 'set #title = :title, #body = :body',
      ExpressionAttributerNames: {
        '#title': 'title',
        '#body': 'body'
        
      }
    }
  }catch(err){
    cb(null, {
      statusCode: 500,
      body: JSON.stringify(err.message)
    });
  }
  
  
  return {
    statusCode: 200,
    body: JSON.stringify("The note with" + notesId + " has been updated! ")
  };
};

module.exports.deleteNote = async (event) => {
  let notesId = event.pathParameters.id;
  return {
    statusCode: 200,
    body: JSON.stringify("The note with id" + notesId + " has been delete! ")
  };
};

module.exports.getallNotes = async (event) => {
  let notesId = event.pathParameters.id;
  return {
    statusCode: 200,
    body: JSON.stringify("All notes are returned! ")
  };
};