/* eslint-env node, mocha */
/* eslint-disable */
require("dotenv").config({ path: `${__dirname}/.env.test` });
const mongoose = require("mongoose");
const { expect } = require("chai");
const should = require("chai").should();
const { have } = require("chai");
const request = require("supertest");
const req = require("express/lib/request");
const chai = require("chai");
const app = require("../app");

chai.use(require("chai-sorted"));

mongoose.Promise = global.Promise;

before((done) => {
    const { DB_PASS } = process.env;
    const { URL } = process.env;
    const { DB_USER } = process.env;

    const options = {
        user: DB_USER,
        pass: DB_PASS,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    mongoose.connect(URL, options);
    mongoose.connection
        .once("open", () => {
            done();
        })
        .on("error", (error) => {
            console.warn("warning", error);
            done(error);
        });
});

after(() => {
    mongoose.disconnect();
});
describe("GET /api/users", () => {
    it("200: returns list of all users", () => {
        return request(app)
            .get("/api/users")
            .expect(200)
            .then(({ body: { users } }) => {
                users.should.be.a("array");
                users.should.be.lengthOf(12);
                users.forEach((user) => {
                    expect(user).to.have.all.keys(
                        "_id",
                        "username",
                        "picture",
                        "name",
                        "email",
                        "password",
                        "progress",
                        "createdAt",
                        "updatedAt"
                    );
                });
            });
    });
});

describe("GET /api/users/:user_id", () => {
    it("200: returns a specific user", () => {
        return request(app)
            .get("/api/users/Cook")
            .expect(200)
            .then(({ body: { user } }) => {
                expect(user).to.eql({
                    _id: "61f1244482f0650a75d7e30b",
                    username: "Cook",
                    picture: "http://placehold.it/32x32",
                    name: "Michael Lyons",
                    email: "michaellyons@moreganic.com",
                    password: 496401,
                    progress: {
                        completed_lessons: [],
                        total_xp: 101,
                        badges: [],
                    },
                    createdAt: "2016-08-22T08:52:14.000Z",
                    updatedAt: "2013-03-23T18:18:55.000Z",
                });
            });
    });
});

describe("GET /api/users/:user_id/progress", () => {
    it("200: get object containing details of progress", () => {
        return request(app)
            .get("/api/users/Cook/progress")
            .expect(200)
            .then(({ body: { progress } }) => {
                expect(progress).to.deep.equal({
                    completed_lessons: [],
                    total_xp: 101,
                    badges: [],
                });
            });
    });
});