/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import clsx from 'clsx';
import {MDXProvider} from '@mdx-js/react';
import Translate, {translate} from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import MDXComponents from '@theme/MDXComponents';
import Seo from '@theme/Seo';
import EditThisPage from '@theme/EditThisPage';
import styles from './styles.module.css'; // Very simple pluralization: probably good enough for now


function BlogPostItem(props) {
  const {
    children,
    frontMatter,
    metadata,
    truncated,
    isBlogPostPage = false,
  } = props;
  const {
    date,
    formattedDate,
    permalink,
    tags,
    title,
    editUrl,
  } = metadata;
  const {author, image, keywords} = frontMatter;
  const {journal, url: publisherURL, pdf: pdfURL} = frontMatter

  const Author = props => {
    const {
      given,
      family,
      isFirst,
      isCorresponding,
      isMember,
      isGerard,
      orcid
    } = props.author

    let classes = [
      isGerard ? 'author-gerard' : '',
      isMember && !isGerard ? 'author-member' : '',
    ].filter(cls => cls)

    // https://scholar.google.com/scholar?q=Shanice+S.+Webster+ 

    return (
      <span className={clsx(styles.author, props.isLast && styles['author-last'])}>
        {orcid && (
          <a href={orcid}>
            <img
              src="/img/orcid.svg" alt="orcid" 
              height="12" width="12"
              className={styles['author-orcid']}
            />
          </a>
        )}
        <span className={clsx(...classes.map(name => styles[name]))}>
          {given.replace('&apos;', "'")} {family.replace('&apos;', "'")}
        </span>
        {isFirst && <sup className={styles['no-style']}>*</sup>} 
        {isCorresponding && <sup className={styles['no-style']}>§</sup>} 
      </span>
    )
  }

  const renderPostHeader = () => {
    const TitleHeading = isBlogPostPage ? 'h1' : 'h2';
    const dateObj = new Date(date)
    const dateFormatted = (dateObj.getUTCDate() == 1)
      ? new Intl.DateTimeFormat('en', {
          month: dateObj.getMonth() === 0 ? 'long' : undefined,
          year: 'numeric',
          timeZone: 'UTC'
        }).format(dateObj)
      : formattedDate
    
    const authors = JSON.parse(author)

    return (
      <header>
        <TitleHeading className={styles.blogPostTitle}>
          {isBlogPostPage ? title : <Link to={permalink}>{title}</Link>}
        </TitleHeading>
        <div>
          {authors.map((author, i) => 
            <Author
              key={frontMatter + author.given + author.family}
              author={author}
              isLast={(i + 1) === authors.length}
            />)}
            {authors.some(({ isFirst, isCorresponding }) => isFirst || isCorresponding) && (
              <p className={styles['symbol-note']}>
                {authors.some(({ isFirst }) => isFirst) &&
                  <>* denotes first authorship</>}
                {authors.some(({ isCorresponding }) => isCorresponding) &&
                  <>&nbsp; § denotes corresponding author</>}
              </p>
            )}
        </div>
        <div className={clsx(styles.blogPostData, 'margin-vert--md')}>
          <time dateTime={date}>Published on {dateFormatted}</time>

          {journal && (
            <>
              {' · '}
              <a href={publisherURL}>{journal}</a>
            </>
          )}

          {pdfURL && (
            <>
              {' · '}
              <a href={pdfURL}>PDF</a>
            </>
          )}
        </div>
      </header>
    );
  };

  return (
    <>
      <Seo
        {...{
          keywords,
          image,
        }}
      />

      <article className={!isBlogPostPage ? 'margin-bottom--xl' : undefined}>
        {renderPostHeader()}
        <div className="markdown">
          <MDXProvider components={MDXComponents}>{children}</MDXProvider>
        </div>
        {(tags.length > 0 || truncated) && (
          <footer
            className={clsx('row docusaurus-mt-lg', styles.blogPostFooter, {
              [styles.blogPostDetailsFull]: isBlogPostPage,
              [styles.truncated]: truncated
            })}>
            {tags.length > 0 && (
              <div className="col">
                <b>
                  <Translate
                    id="theme.tags.tagsListLabel"
                    description="The label alongside a tag list">
                    Tags:
                  </Translate>
                </b>
                {tags.map(({label, permalink: tagPermalink}) => (
                  <Link
                    key={tagPermalink}
                    className="margin-horiz--sm"
                    to={tagPermalink}>
                    {label}
                  </Link>
                ))}
              </div>
            )}

            {isBlogPostPage && editUrl && (
              <div className="col margin-top--sm">
                <EditThisPage editUrl={editUrl} />
              </div>
            )}

            {!isBlogPostPage && truncated && frontMatter.hasAbstract && (
              <div className={clsx("col text--right"), styles.readAbstract}>
                <Link
                  to={metadata.permalink}
                  aria-label={`Read more about ${title}`}>
                  <b>
                    <Translate
                      id="theme.blog.post.readMore"
                      description="The label used in blog post item excerpts to link to full blog posts">
                      Read Abstract
                    </Translate>
                  </b>
                </Link>
              </div>
            )}
          </footer>
        )}
      </article>
    </>
  );
}

export default BlogPostItem;
