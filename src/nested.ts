import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";
import { duplicateQuestion, makeBlankQuestion } from "./objects";

/**
 * Consumes an array of questions and returns a new array with only the questions
 * that are `published`.
 */
export function getPublishedQuestions(questions: Question[]): Question[] {
    const publishedQs = questions.filter((q: Question): boolean => q.published);
    return publishedQs;
}

/**
 * Consumes an array of questions and returns a new array of only the questions that are
 * considered "non-empty". An empty question has an empty string for its `body` and
 * `expected`, and an empty array for its `options`.
 */
export function getNonEmptyQuestions(questions: Question[]): Question[] {
    const nonEmptyQs = questions.filter(
        (q: Question): boolean =>
            q.body.length !== 0 ||
            q.expected.length !== 0 ||
            q.options.length !== 0
    );
    return nonEmptyQs;
}

/***
 * Consumes an array of questions and returns the question with the given `id`. If the
 * question is not found, return `null` instead.
 */
export function findQuestion(
    questions: Question[],
    id: number
): Question | null {
    const question = questions.find((q: Question): boolean => q.id === id);
    if (question === undefined) {
        return null;
    }
    return question;
}

/**
 * Consumes an array of questions and returns a new array that does not contain the question
 * with the given `id`.
 */
export function removeQuestion(questions: Question[], id: number): Question[] {
    const qRemoved = questions.filter((q: Question): boolean => q.id !== id);
    return qRemoved;
}

/***
 * Consumes an array of questions and returns a new array containing just the names of the
 * questions, as an array.
 */
export function getNames(questions: Question[]): string[] {
    const qNames = questions.map((q: Question): string => q.name);
    return qNames;
}

/***
 * Consumes an array of questions and returns the sum total of all their points added together.
 */
export function sumPoints(questions: Question[]): number {
    const sumPoints = questions.reduce(
        (sum: number, q: Question) => sum + q.points,
        0
    );
    return sumPoints;
}

/***
 * Consumes an array of questions and returns the sum total of the PUBLISHED questions' points.
 */
export function sumPublishedPoints(questions: Question[]): number {
    const publishedQs = getPublishedQuestions(questions);
    const totalPoints = publishedQs.reduce(
        (total: number, q: Question) => total + q.points,
        0
    );
    return totalPoints;
}

/***
 * Consumes an array of questions, and produces a Comma-Separated Value (CSV) string representation.
 * A CSV is a type of file frequently used to share tabular data; we will use a single string
 * to represent the entire file. The first line of the file is the headers "id", "name", "options",
 * "points", and "published". The following line contains the value for each question, separated by
 * commas. For the `options` field, use the NUMBER of options.
 *
 * Here is an example of what this will look like (do not include the border).
 *`
id,name,options,points,published
1,Addition,0,1,true
2,Letters,0,1,false
5,Colors,3,1,true
9,Shapes,3,2,false
` *
 * Check the unit tests for more examples!
 */
export function toCSV(questions: Question[]): string {
    const qCSV = questions
        .map(
            (q: Question): string =>
                `${q.id},${q.name},${q.options.length},${q.points},${q.published}`
        )
        .join("\n");
    return "id,name,options,points,published\n" + qCSV;
}

/**
 * Consumes an array of Questions and produces a corresponding array of
 * Answers. Each Question gets its own Answer, copying over the `id` as the `questionId`,
 * making the `text` an empty string, and using false for both `submitted` and `correct`.
 */
export function makeAnswers(questions: Question[]): Answer[] {
    const answers = questions.map(
        (q: Question): Answer => ({
            questionId: q.id,
            text: "",
            submitted: false,
            correct: false
        })
    );
    return answers;
}

/***
 * Consumes an array of Questions and produces a new array of questions, where
 * each question is now published, regardless of its previous published status.
 */
export function publishAll(questions: Question[]): Question[] {
    const newQs = questions.map(
        (q: Question): Question => ({
            ...q,
            published: true,
            options: [...q.options]
        })
    );
    return newQs;
}

/***
 * Consumes an array of Questions and produces whether or not all the questions
 * are the same type. They can be any type, as long as they are all the SAME type.
 */
export function sameType(questions: Question[]): boolean {
    if (questions.length === 0) {
        return true;
    }
    const firstQType = questions[0].type;
    const sameTypeQs = questions.filter(
        (q: Question): boolean => q.type === firstQType
    );
    if (sameTypeQs.length === questions.length) {
        return true;
    }
    return false;
}

/***
 * Consumes an array of Questions and produces a new array of the same Questions,
 * except that a blank question has been added onto the end. Reuse the `makeBlankQuestion`
 * you defined in the `objects.ts` file.
 */
export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType
): Question[] {
    const newQs = questions.map(
        (q: Question): Question => ({
            ...q,
            options: [...q.options]
        })
    );
    newQs.splice(questions.length, 0, makeBlankQuestion(id, name, type));
    return newQs;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its name should now be `newName`.
 */
export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string
): Question[] {
    const newQs = questions.map(
        (q: Question): Question =>
            q.id === targetId
                ? { ...q, options: [...q.options], name: newName }
                : { ...q, options: [...q.options], name: q.name }
    );
    return newQs;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `type` should now be the `newQuestionType`
 * AND if the `newQuestionType` is no longer "multiple_choice_question" than the `options`
 * must be set to an empty list.
 */
export function changeQuestionTypeById(
    questions: Question[],
    targetId: number,
    newQuestionType: QuestionType
): Question[] {
    const newQs = questions.map(
        (q: Question): Question =>
            q.id === targetId
                ? newQuestionType !== "multiple_choice_question"
                    ? { ...q, options: [], type: newQuestionType }
                    : { ...q, options: [...q.options], type: newQuestionType }
                : { ...q, options: [...q.options] }
    );
    return newQs;
}

/**
 * Helper function for editOption() function. If the `targetOptionIndex` is -1, the
 * `newOption` is  added to the end of the options list.
 * Otherwise, it replaces the existing element at the `targetOptionIndex`.
 * rH stands for replacing options helper.
 */
export function rH(
    options: string[],
    targetOptionIndex: number,
    newOption: string
): string[] {
    if (targetOptionIndex === -1) {
        return [...options, newOption];
    } else {
        const ops = [...options];
        ops.splice(targetOptionIndex, 1, newOption);
        return ops;
    }
}

/**
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `option` array should have a new element.
 * If the `targetOptionIndex` is -1, the `newOption` should be added to the end of the list.
 * Otherwise, it should *replace* the existing element at the `targetOptionIndex`.
 *
 * Remember, if a function starts getting too complicated, think about how a helper function
 * can make it simpler! Break down complicated tasks into little pieces.
 */
export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string
): Question[] {
    const newQs = questions.map(
        (q: Question): Question =>
            q.id === targetId
                ? { ...q, options: rH(q.options, targetOptionIndex, newOption) }
                : { ...q, options: [...q.options] }
    );
    return newQs;
}

/***
 * Consumes an array of questions, and produces a new array based on the original array.
 * The only difference is that the question with id `targetId` should now be duplicated, with
 * the duplicate inserted directly after the original question. Use the `duplicateQuestion`
 * function you defined previously; the `newId` is the parameter to use for the duplicate's ID.
 */
export function duplicateQuestionInArray(
    questions: Question[],
    targetId: number,
    newId: number
): Question[] {
    const newQs = questions.map(
        (q: Question): Question => ({
            ...q,
            options: [...q.options]
        })
    );
    const qToDuplicate = questions.find(
        (q: Question): boolean => q.id === targetId
    );
    if (qToDuplicate !== undefined) {
        const qIndex = questions.indexOf(qToDuplicate);
        newQs.splice(qIndex + 1, 0, duplicateQuestion(newId, qToDuplicate));
    }
    return newQs;
}
