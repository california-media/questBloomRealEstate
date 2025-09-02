import React, { useState } from "react";

const AdminPropertyDescriptions = ({ property }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get the raw description or fallback
  const rawDescription =
    property?.property_description ||
    `<p>This property offers a unique blend of modern architecture and natural elements.</p>`;

  // Function to truncate HTML while preserving tags
  const truncateHTML = (html, maxLength) => {
    let length = 0;
    let result = "";
    let tagStack = [];
    let inTag = false;
    let currentTag = "";
    let ellipsisAdded = false;

    for (let i = 0; i < html.length; i++) {
      const char = html[i];

      if (char === "<") {
        inTag = true;
        currentTag = char;
        continue;
      }

      if (inTag) {
        currentTag += char;

        if (char === ">") {
          inTag = false;

          // Handle closing tags
          if (currentTag.startsWith("</")) {
            const openedTag = tagStack.pop();
            result += `</${openedTag}>`;
          }
          // Handle self-closing tags
          else if (currentTag.endsWith("/>")) {
            result += currentTag;
          }
          // Handle opening tags
          else {
            const tagNameMatch = currentTag.match(/^<([^\s>]+)/);
            if (tagNameMatch) {
              const tagName = tagNameMatch[1];
              tagStack.push(tagName);
              result += currentTag;
            }
          }
          currentTag = "";
        }
        continue;
      }

      // Count visible characters
      if (length < maxLength) {
        result += char;
        length++;
      } else if (!ellipsisAdded) {
        result += "...";
        ellipsisAdded = true;

        // Close all open tags
        while (tagStack.length > 0) {
          result += `</${tagStack.pop()}>`;
        }
      }
    }

    return result;
  };

  const previewLength = 200;
  const previewHtml = truncateHTML(rawDescription, previewLength);
  const needsTruncation = rawDescription.length > previewLength;

  return (
    <div className="property-description-container">
      <div
        className="text mb10"
        dangerouslySetInnerHTML={{
          __html: isExpanded || !needsTruncation ? rawDescription : previewHtml,
        }}
      />

      {needsTruncation && (
        <div className="agent-single-accordion">
          <div className="accordion accordion-flush">
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOne">
                <button
                  className="accordion-button p-0 collapsed"
                  type="button"
                  onClick={() => setIsExpanded((prev) => !prev)}
                >
                  {isExpanded ? "Show less" : "Show more"}
                </button>
              </h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPropertyDescriptions;
